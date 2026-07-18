// Flutter Widget - RBC Import & Export Academy Certificate
// This is an editable, printable certificate widget for Flutter applications.
// Dependencies: flutter, google_fonts, qr_flutter

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:qr_flutter/qr_flutter.dart';

class CertificateData {
  String studentName;
  String issueDate;
  String duration;
  String level;
  String score;
  String courseName;
  String certificateId;
  String academyName;
  String tagline;
  String directorSig;
  String directorName;
  String directorRole;
  String founderSig;
  String founderName;
  String founderRole;
  String verifyUrl;
  String description;
  String contactInfo;

  CertificateData({
    this.studentName = 'RBC',
    this.issueDate = '18 July 2026',
    this.duration = '10+ Hours',
    this.level = 'Beginner to Advanced',
    this.score = '95% - 100%',
    this.courseName = 'IMPORT & EXPORT MASTER COURSE',
    this.certificateId = 'RBC-2026-000215',
    this.academyName = 'RBC IMPORT & EXPORT ACADEMY',
    this.tagline = 'Learn • Trade • Grow Globally',
    this.contactInfo = 'India · rbcimportexport@rbc.com · +91 98765 43210',
    this.directorSig = 'Kunal Pawar',
    this.directorName = 'KUNAL PAWAR',
    this.directorRole = 'Academy Director',
    this.founderSig = 'Prakash Kachchhi',
    this.founderName = 'PRAKASH KACHCHHI',
    this.founderRole = 'Founder & CEO',
    this.verifyUrl = 'academy.rbcimportandexport.com/verify',
    this.description =
        'for successfully completing all learning modules, practice quizzes, video lectures, assignments, and final assessment in the course',
  });
}

class CertificateWidget extends StatelessWidget {
  final CertificateData data;
  final bool editable;
  final ValueChanged<CertificateData>? onChanged;

  const CertificateWidget({
    super.key,
    required this.data,
    this.editable = false,
    this.onChanged,
  });

  static const Color primaryNavy = Color(0xFF102A56);
  static const Color secondaryOrange = Color(0xFFF57C00);
  static const Color accentGold = Color(0xFFD4AF37);
  static const Color bgWarm = Color(0xFFFAF9F6);
  static const Color goldLight = Color(0xFFF5E6A3);
  static const Color goldDark = Color(0xFFB8960C);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 3508,
      height: 2480,
      decoration: const BoxDecoration(color: bgWarm),
      child: Stack(
        children: [
          // Background Watermarks
          Positioned.fill(
            child: Opacity(
              opacity: 0.03,
              child: CustomPaint(
                painter: _BackgroundPainter(),
              ),
            ),
          ),

          // Borders
          Positioned(
            left: 18, top: 18, right: 18, bottom: 18,
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: primaryNavy, width: 6),
              ),
            ),
          ),
          Positioned(
            left: 30, top: 30, right: 30, bottom: 30,
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: accentGold, width: 3),
              ),
            ),
          ),
          Positioned(
            left: 38, top: 38, right: 38, bottom: 38,
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: secondaryOrange, width: 2),
              ),
            ),
          ),

          // Corner Ornaments
          ..._buildCornerOrnaments(),

          // Left Sidebar
          Positioned(
            left: 38, top: 38, bottom: 38,
            child: ClipPath(
              clipper: _SidebarClipper(),
              child: Container(
                width: 340,
                color: primaryNavy,
                padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 50),
                child: Column(
                  children: [
                    // Medal
                    Container(
                      width: 120,
                      height: 120,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: RadialGradient(
                          center: Alignment(0.3, 0.3),
                          colors: [goldLight, accentGold, goldDark],
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Color.fromRGBO(212, 175, 55, 0.4),
                            blurRadius: 20,
                            offset: Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          Container(
                            margin: const EdgeInsets.all(6),
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.fromBorderSide(
                                BorderSide(color: Colors.white38, width: 3),
                              ),
                            ),
                          ),
                          // Star medal icon
                          CustomPaint(
                            size: const Size(56, 56),
                            painter: _MedalPainter(),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 50),

                    // Sidebar Items
                    _SidebarItem(
                      icon: Icons.access_time_rounded,
                      label: 'DATE OF ISSUE',
                      value: data.issueDate,
                    ),
                    _buildSidebarDivider(),
                    _SidebarItem(
                      icon: Icons.bar_chart_rounded,
                      label: 'DURATION',
                      value: data.duration,
                    ),
                    _buildSidebarDivider(),
                    _SidebarItem(
                      icon: Icons.star_rounded,
                      label: 'LEVEL',
                      value: data.level,
                    ),
                    _buildSidebarDivider(),
                    _SidebarItem(
                      icon: Icons.check_circle_rounded,
                      label: 'SCORE',
                      value: data.score,
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Top Bar
          Positioned(
            left: 420, top: 60, right: 60,
            child: SizedBox(
              height: 100,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Emblem + Academy Name
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: primaryNavy,
                          border: Border.all(color: accentGold, width: 4),
                        ),
                        child: Center(
                          child: Container(
                            width: 68,
                            height: 68,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: accentGold.withOpacity(0.4),
                                width: 2,
                              ),
                            ),
                            child: const Center(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('RBC',
                                    style: TextStyle(
                                      fontFamily: 'Cinzel',
                                      fontSize: 12,
                                      fontWeight: FontWeight.w700,
                                      color: accentGold,
                                    )),
                                  Text('ACADEMY',
                                    style: TextStyle(
                                      fontFamily: 'Cinzel',
                                      fontSize: 14,
                                      fontWeight: FontWeight.w900,
                                      color: accentGold,
                                    )),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 18),
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(data.academyName,
                            style: GoogleFonts.cinzel(
                              fontSize: 26,
                              fontWeight: FontWeight.w700,
                              color: primaryNavy,
                              letterSpacing: 3,
                            )),
                          const SizedBox(height: 2),
                          Text(data.tagline,
                            style: GoogleFonts.montserrat(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                              color: secondaryOrange,
                              letterSpacing: 4,
                            )),
                        ],
                      ),
                    ],
                  ),

                  // Certificate ID
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text('CERTIFICATE ID',
                        style: GoogleFonts.montserrat(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: primaryNavy,
                          letterSpacing: 2,
                        )),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                        decoration: BoxDecoration(
                          color: secondaryOrange.withOpacity(0.08),
                          border: Border.all(color: secondaryOrange.withOpacity(0.2)),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(data.certificateId,
                          style: GoogleFonts.inter(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                            color: secondaryOrange,
                          )),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // Center Content
          Positioned(
            left: 420, right: 60, top: 180, bottom: 160,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Title
                Text.rich(
                  TextSpan(
                    children: [
                      TextSpan(
                        text: 'CERTIFICATE\n',
                        style: GoogleFonts.cinzel(
                          fontSize: 56,
                          fontWeight: FontWeight.w700,
                          color: primaryNavy,
                          letterSpacing: 12,
                          height: 1.1,
                        ),
                      ),
                      TextSpan(
                        text: 'OF\n',
                        style: GoogleFonts.cinzel(
                          fontSize: 52,
                          fontWeight: FontWeight.w300,
                          color: accentGold,
                          letterSpacing: 16,
                          height: 1.1,
                        ),
                      ),
                      TextSpan(
                        text: 'COMPLETION',
                        style: GoogleFonts.cinzel(
                          fontSize: 56,
                          fontWeight: FontWeight.w700,
                          color: primaryNavy,
                          letterSpacing: 12,
                          height: 1.1,
                        ),
                      ),
                    ],
                  ),
                  textAlign: TextAlign.center,
                ),

                const SizedBox(height: 16),
                Container(
                  width: 200,
                  height: 2,
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.transparent, accentGold, Colors.transparent],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                Text('This certificate is proudly presented to',
                  style: GoogleFonts.montserrat(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: primaryNavy,
                    letterSpacing: 3,
                  )),
                const SizedBox(height: 8),

                // Recipient Name
                Text(data.studentName,
                  style: GoogleFonts.greatVibes(
                    fontSize: 80,
                    fontWeight: FontWeight.w400,
                    color: primaryNavy,
                  )),
                const SizedBox(height: 4),

                // Contact Info
                Text(data.contactInfo,
                  style: GoogleFonts.inter(
                    fontSize: 13,
                    fontWeight: FontWeight.w400,
                    color: const Color(0xFF888888),
                    letterSpacing: 1,
                  )),
                const SizedBox(height: 10),

                // Description
                Text(data.description,
                  style: GoogleFonts.inter(
                    fontSize: 15,
                    fontWeight: FontWeight.w400,
                    color: const Color(0xFF555555),
                    height: 1.5,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),

                // Course Ribbon
                SizedBox(
                  width: 1200,
                  child: Stack(
                    children: [
                      // Ribbon body
                      Container(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        decoration: BoxDecoration(
                          color: primaryNavy,
                          boxShadow: const [
                            BoxShadow(
                              color: Color.fromRGBO(16, 42, 86, 0.3),
                              blurRadius: 15,
                              offset: Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Stack(
                          children: [
                            // Gold border
                            Positioned(
                              left: 2, top: 2, right: 2, bottom: 2,
                              child: Container(
                                decoration: BoxDecoration(
                                  border: Border.all(color: accentGold, width: 2),
                                ),
                              ),
                            ),
                            Center(
                              child: Text(data.courseName,
                                style: GoogleFonts.cinzel(
                                  fontSize: 22,
                                  fontWeight: FontWeight.w700,
                                  color: accentGold,
                                  letterSpacing: 4,
                                )),
                            ),
                          ],
                        ),
                      ),
                      // Ribbon left tail
                      Positioned(
                        left: -15, top: 0, bottom: 0,
                        child: Transform(
                          transform: Matrix4.skewX(-0.18),
                          alignment: Alignment.centerLeft,
                          child: Container(
                            width: 30,
                            color: primaryNavy,
                          ),
                        ),
                      ),
                      // Ribbon right tail
                      Positioned(
                        right: -15, top: 0, bottom: 0,
                        child: Transform(
                          transform: Matrix4.skewX(0.18),
                          alignment: Alignment.centerRight,
                          child: Container(
                            width: 30,
                            color: primaryNavy,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Right Panel
          Positioned(
            right: 70,
            top: 2480 / 2 - 180,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                _RightPanelItem(
                  icon: Icons.menu_book_rounded,
                  label: 'COMPREHENSIVE\nCURRICULUM',
                ),
                const SizedBox(height: 28),
                _RightPanelItem(
                  icon: Icons.verified_rounded,
                  label: 'INDUSTRY\nRELEVANT',
                ),
                const SizedBox(height: 28),
                _RightPanelItem(
                  icon: Icons.star_rounded,
                  label: 'EXPERT\nINSTRUCTORS',
                ),
                const SizedBox(height: 28),
                _RightPanelItem(
                  icon: Icons.public_rounded,
                  label: 'GLOBAL\nPERSPECTIVE',
                ),
              ],
            ),
          ),

          // Bottom Section
          Positioned(
            left: 420, right: 60, bottom: 70,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                // Director
                Expanded(
                  child: _SignatureBlock(
                    name: data.directorSig,
                    title: data.directorName,
                    subtitle: data.directorRole,
                    capitalName: 'KUNAL PAWAR',
                  ),
                ),

                // Center - Seal & QR
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Gold Seal
                      Container(
                        width: 100,
                        height: 100,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: RadialGradient(
                            center: Alignment(0.3, 0.3),
                            colors: [goldLight, accentGold, goldDark],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Color.fromRGBO(212, 175, 55, 0.3),
                              blurRadius: 20,
                              offset: Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Center(
                          child: Container(
                            width: 90,
                            height: 90,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: Colors.white.withOpacity(0.4),
                                width: 2,
                              ),
                            ),
                            child: const Center(
                              child: Text(
                                'COMPLETED\nWITH\nEXCELLENCE',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontFamily: 'Cinzel',
                                  fontSize: 9,
                                  fontWeight: FontWeight.w700,
                                  color: primaryNavy,
                                  height: 1.2,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      // QR Code
                      Container(
                        width: 64,
                        height: 64,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: primaryNavy, width: 2),
                        ),
                        child: QrImageView(
                          data: data.verifyUrl,
                          version: QrVersions.auto,
                          size: 56,
                          backgroundColor: Colors.white,
                          eyeStyle: const QrEyeStyle(
                            eyeShape: QrEyeShape.square,
                            color: primaryNavy,
                          ),
                          dataModuleStyle: const QrDataModuleStyle(
                            dataModuleShape: QrDataModuleShape.square,
                            color: primaryNavy,
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text('VERIFY CERTIFICATE',
                        style: GoogleFonts.montserrat(
                          fontSize: 8,
                          fontWeight: FontWeight.w500,
                          color: primaryNavy,
                          letterSpacing: 1,
                        )),
                      Text('Scan QR code or visit ${data.verifyUrl}',
                        style: GoogleFonts.inter(
                          fontSize: 7,
                          fontWeight: FontWeight.w400,
                          color: const Color(0xFF888888),
                        )),
                    ],
                  ),
                ),

                // Founder
                Expanded(
                  child: _SignatureBlock(
                    name: data.founderSig,
                    title: data.founderName,
                    subtitle: data.founderRole,
                    capitalName: 'PRAKASH KACHCHHI',
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSidebarDivider() {
    return Container(
      height: 1,
      margin: const EdgeInsets.symmetric(horizontal: 10),
      color: accentGold.withOpacity(0.25),
    );
  }

  List<Widget> _buildCornerOrnaments() {
    return [
      Positioned(left: 38, top: 38,
        child: _CornerOrnament(transform: Matrix4.identity())),
      Positioned(right: 38, top: 38,
        child: _CornerOrnament(transform: Matrix4.identity()..scale(-1, 1))),
      Positioned(left: 38, bottom: 38,
        child: _CornerOrnament(transform: Matrix4.identity()..scale(1, -1))),
      Positioned(right: 38, bottom: 38,
        child: _CornerOrnament(transform: Matrix4.identity()..scale(-1, -1))),
    ];
  }
}

class _SidebarClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final path = Path();
    path.moveTo(0, 0);
    path.lineTo(size.width, 0);
    path.lineTo(size.width * 0.88, size.height);
    path.lineTo(0, size.height);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}

class _SidebarItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _SidebarItem({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
      child: Column(
        children: [
          Icon(icon, color: CertificateWidget.accentGold, size: 28),
          const SizedBox(height: 8),
          Text(label,
            style: GoogleFonts.montserrat(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: Colors.white60,
              letterSpacing: 2,
            )),
          const SizedBox(height: 4),
          Text(value,
            style: GoogleFonts.inter(
              fontSize: 20,
              fontWeight: FontWeight.w500,
              color: Colors.white,
            )),
        ],
      ),
    );
  }
}

class _RightPanelItem extends StatelessWidget {
  final IconData icon;
  final String label;

  const _RightPanelItem({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label,
          style: GoogleFonts.montserrat(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF102A56),
            letterSpacing: 1.5,
            height: 1.3,
          ),
          textAlign: TextAlign.right,
        ),
        const SizedBox(width: 14),
        Container(
          width: 52,
          height: 52,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: const Color(0xFFD4AF37), width: 2),
            color: const Color(0xFFD4AF37).withOpacity(0.06),
          ),
          child: Icon(icon, color: const Color(0xFF102A56), size: 24),
        ),
      ],
    );
  }
}

class _SignatureBlock extends StatelessWidget {
  final String name;
  final String title;
  final String subtitle;
  final String capitalName;

  const _SignatureBlock({
    required this.name,
    required this.title,
    required this.subtitle,
    required this.capitalName,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 220,
          height: 2,
          color: const Color(0xFF102A56),
        ),
        const SizedBox(height: 6),
        Text(name,
          style: GoogleFonts.greatVibes(
            fontSize: 32,
            color: const Color(0xFF102A56),
          )),
        Text(capitalName,
          style: GoogleFonts.montserrat(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF102A56),
            letterSpacing: 2,
          )),
        Text(subtitle,
          style: GoogleFonts.inter(
            fontSize: 10,
            fontWeight: FontWeight.w400,
            color: const Color(0xFF888888),
          )),
      ],
    );
  }
}

class _CornerOrnament extends StatelessWidget {
  final Matrix4 transform;

  const _CornerOrnament({required this.transform});

  @override
  Widget build(BuildContext context) {
    return Transform(
      transform: transform,
      child: CustomPaint(
        size: const Size(60, 60),
        painter: _OrnamentPainter(),
      ),
    );
  }
}

class _BackgroundPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF102A56)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3;

    // World map outlines (simplified)
    final path = Path()
      ..moveTo(400, 1200)
      ..quadraticBezierTo(500, 1100, 600, 1150)
      ..quadraticBezierTo(700, 1180, 750, 1250)
      ..quadraticBezierTo(800, 1320, 700, 1400)
      ..quadraticBezierTo(600, 1450, 500, 1400)
      ..quadraticBezierTo(400, 1350, 400, 1200)
      ..close();
    canvas.drawPath(path, paint);

    // Cargo ship
    final shipPaint = Paint()
      ..color = const Color(0xFF102A56)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3;
    canvas.save();
    canvas.translate(600, 1850);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(0, 0, 200, 40), const Radius.circular(3)), shipPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(20, -30, 30, 30), const Radius.circular(2)), shipPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(60, -30, 30, 30), const Radius.circular(2)), shipPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(100, -30, 30, 30), const Radius.circular(2)), shipPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(140, -30, 30, 30), const Radius.circular(2)), shipPaint);
    canvas.drawLine(const Offset(100, -30), const Offset(100, -80), shipPaint);
    canvas.drawLine(const Offset(95, -80), const Offset(130, -60), shipPaint);
    canvas.drawLine(const Offset(95, -80), const Offset(80, -60), shipPaint);
    canvas.restore();

    // Port Crane
    canvas.save();
    canvas.translate(2800, 1650);
    canvas.drawLine(const Offset(40, 0), const Offset(40, -120), shipPaint);
    canvas.drawLine(const Offset(0, -90), const Offset(80, -90), shipPaint);
    canvas.drawLine(const Offset(40, -120), const Offset(0, -90), shipPaint);
    canvas.drawLine(const Offset(40, -120), const Offset(80, -90), shipPaint);
    canvas.drawLine(const Offset(0, -90), const Offset(0, -70), shipPaint);
    canvas.drawRect(RRect.fromRectAndRadius(Rect.fromLTWH(-5, 0, 15, 10), const Radius.circular(1)), shipPaint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _MedalPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFD4AF37)
      ..style = PaintingStyle.fill;

    final center = Offset(size.width / 2, size.height / 2);
    final path = Path()
      ..moveTo(center.dx, center.dy - 16)
      ..lineTo(center.dx + 6, center.dy - 4)
      ..lineTo(center.dx + 18, center.dy - 4)
      ..lineTo(center.dx + 8, center.dy + 6)
      ..lineTo(center.dx + 12, center.dy + 18)
      ..lineTo(center.dx, center.dy + 10)
      ..lineTo(center.dx - 12, center.dy + 18)
      ..lineTo(center.dx - 8, center.dy + 6)
      ..lineTo(center.dx - 18, center.dy - 4)
      ..lineTo(center.dx - 6, center.dy - 4)
      ..close();
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _OrnamentPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFD4AF37)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final path = Path()
      ..moveTo(0, 30)
      ..lineTo(10, 30)
      ..lineTo(10, 10)
      ..lineTo(30, 10)
      ..lineTo(30, 0);
    canvas.drawPath(path, paint);

    final dotPaint = Paint()
      ..color = const Color(0xFFD4AF37)
      ..style = PaintingStyle.fill;
    canvas.drawCircle(const Offset(10, 10), 3, dotPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Usage Example:
// CertificateData data = CertificateData();
// data.studentName = 'John Doe';
// data.courseName = 'IMPORT & EXPORT MASTER COURSE';
//
// MaterialApp(
//   home: Scaffold(
//     body: SingleChildScrollView(
//       child: InteractiveViewer(
//         child: CertificateWidget(data: data),
//       ),
//     ),
//   ),
// );
