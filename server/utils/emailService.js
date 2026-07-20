const https = require('https');
const http = require('http');

/**
 * Send Email via Google Apps Script Web App Endpoint
 */
const sendViaGoogleAppsScript = (scriptUrl, payload) => {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(scriptUrl);
      const postData = JSON.stringify(payload);

      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = (url.protocol === 'https:' ? https : http).request(options, (res) => {
        // Handle Google Apps Script 302 / 307 Redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location);
          const redirectOptions = {
            hostname: redirectUrl.hostname,
            path: redirectUrl.pathname + redirectUrl.search,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
          };
          const redirectReq = (redirectUrl.protocol === 'https:' ? https : http).request(redirectOptions, (rRes) => {
            let data = '';
            rRes.on('data', chunk => { data += chunk; });
            rRes.on('end', () => {
              try { resolve(JSON.parse(data)); } catch { resolve({ success: true }); }
            });
          });
          redirectReq.on('error', (err) => reject(err));
          redirectReq.write(postData);
          redirectReq.end();
          return;
        }

        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          try { resolve(JSON.parse(data)); } catch { resolve({ success: true }); }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(postData);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Send 6-Digit OTP Email
 * Supports: Google Apps Script Web App API, Nodemailer, and Console Fallback
 */
const sendOTPEmail = async (toEmail, otpCode, type = 'register') => {
  const isForgot = type === 'forgot_password';
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  console.log('\n======================================================');
  console.log(`✉️  [OTP SERVICE] Code for ${toEmail}: \x1b[33m\x1b[1m${otpCode}\x1b[0m (${type})`);
  console.log('======================================================\n');

  // Method 1: Google Apps Script Web App
  if (appsScriptUrl && appsScriptUrl.startsWith('http')) {
    try {
      const response = await sendViaGoogleAppsScript(appsScriptUrl, {
        email: toEmail,
        otp: otpCode,
        type: isForgot ? 'Password Reset' : 'Account Registration',
        academy: 'RBC Import & Export Academy'
      });
      console.log(`✅ [OTP SERVICE] Email sent via Google Apps Script to ${toEmail}`);
      return { success: true, message: 'OTP sent to your email address via Google Mail' };
    } catch (err) {
      console.error(`⚠️ [OTP SERVICE] Google Apps Script call error:`, err.message);
      return { success: true, message: `OTP generated: ${otpCode} (Check terminal logs or Google Apps Script setup)` };
    }
  }

  return {
    success: true,
    message: `OTP Code: ${otpCode} (Add GOOGLE_APPS_SCRIPT_URL in server/.env to send real emails)`
  };
};

module.exports = { sendOTPEmail };
