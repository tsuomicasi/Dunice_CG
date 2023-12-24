import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flagg/screens/account_screen.dart';
import 'package:flagg/screens/home_page_widget.dart';
import 'package:flagg/screens/login_screen.dart';
import 'package:flagg/screens/reset_password_screen.dart';
import 'package:flagg/screens/signup_screen.dart';
import 'package:flagg/screens/start_screen.dart';
import 'package:flagg/screens/verify_email_screen.dart';
import 'package:flagg/services/firebase_stream.dart';
import 'package:flutter/material.dart';
import 'package:flagg/firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        pageTransitionsTheme: const PageTransitionsTheme(builders: {
          TargetPlatform.android: CupertinoPageTransitionsBuilder(),
        }),
      ),
      routes: {
        '/': (context) => const FirebaseStream(),
        '/start':(context)=> const HomePageWidget(),
        '/home': (context) => const StartScreen(),
        '/account': (context) => const AccountScreen(),
        '/login': (context) => const LoginScreen(),
        '/signup': (context) => const SignUpScreen(),
        '/reset_password': (context) => const ResetPasswordScreen(),
        '/verify_email': (context) => const VerifyEmailScreen(),
      },
      initialRoute: '/start',
    );
  }
}
