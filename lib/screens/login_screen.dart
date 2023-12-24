import 'package:email_validator/email_validator.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flagg/services/snack_bar.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool isHiddenPassword = true;
  TextEditingController emailTextInputController = TextEditingController();
  TextEditingController passwordTextInputController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    emailTextInputController.dispose();
    passwordTextInputController.dispose();

    super.dispose();
  }

  void togglePasswordView() {
    setState(() {
      isHiddenPassword = !isHiddenPassword;
    });
  }

  Future<void> login() async {
    final navigator = Navigator.of(context);

    final isValid = formKey.currentState!.validate();
    if (!isValid) return;

    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: emailTextInputController.text.trim(),
        password: passwordTextInputController.text.trim(),
      );
    } on FirebaseAuthException catch (e) {
      print(e.code);

      if (e.code == 'user-not-found' || e.code == 'wrong-password') {
        SnackBarService.showSnackBar(
          context,
          'Неправильный email или пароль. Повторите попытку',
          true,
        );
        return;
      } else {
        SnackBarService.showSnackBar(
          context,
          'Неизвестная ошибка! Попробуйте еще раз или обратитесь в поддержку.',
          true,
        );
        return;
      }
    }

    navigator.pushNamedAndRemoveUntil('/start', (Route<dynamic> route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(4, 4, 4, 1),
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(4, 4, 4, 1),
        title: const Text('Войти', style: TextStyle(fontFamily: 'Ubuntu', color: Color.fromRGBO(217, 217, 217, 1), fontSize: 28),),
      ),
      body: Padding(
        padding: const EdgeInsets.all(30.0),
        child: Form(
          key: formKey,
          child: Column(
            children: [
              Container(height: 100,),
              TextFormField(
                style: TextStyle(color: Color.fromRGBO(217, 217, 217, 1), fontFamily: 'Ubuntu', fontSize: 22),
                keyboardType: TextInputType.emailAddress,
                autocorrect: false,
                controller: emailTextInputController,
                validator: (email) =>
                    email != null && !EmailValidator.validate(email)
                        ? 'Введите правильный Email'
                        : null,
                decoration:  InputDecoration(
                  border: OutlineInputBorder(),
                  enabledBorder: OutlineInputBorder(borderSide: BorderSide( color: Color.fromRGBO(217, 217, 217, 1), width: 2),borderRadius: BorderRadius.circular(8)),
                  focusedBorder: OutlineInputBorder(borderSide: BorderSide( color: Color.fromRGBO(140, 240, 209, 1), width: 2),borderRadius: BorderRadius.circular(8)), 
                  hintText: 'Введите Email',
                  hintStyle: TextStyle(color: Color.fromRGBO(140, 240, 209, 0.3), fontFamily: 'Ubuntu')
                  
                ),
              ),
              const SizedBox(height: 30),
              TextFormField(
                style: TextStyle(color: Color.fromRGBO(217, 217, 217, 1), fontFamily: 'Ubuntu', fontSize: 22),

                autocorrect: false,
                controller: passwordTextInputController,
                obscureText: isHiddenPassword,
                validator: (value) => value != null && value.length < 6
                    ? 'Минимум 6 символов'
                    : null,
                autovalidateMode: AutovalidateMode.onUserInteraction,
                decoration: InputDecoration(
                  
                  border: const OutlineInputBorder(),
                  enabledBorder: OutlineInputBorder(borderSide: BorderSide( color: Color.fromRGBO(217, 217, 217, 1), width: 2),borderRadius: BorderRadius.circular(8)),
                  focusedBorder: OutlineInputBorder(borderSide: BorderSide( color: Color.fromRGBO(140, 240, 209, 1), width: 2),borderRadius: BorderRadius.circular(8)),
                  
                  hintText: 'Введите пароль',
                  hintStyle: TextStyle(color: Color.fromRGBO(140, 240, 209, 0.3), fontFamily: 'Ubuntu'),
                  suffix: InkWell(
                    onTap: togglePasswordView,
                    child: Icon(
                      isHiddenPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: Color.fromRGBO(217, 217, 217, 1),
                    ),
                  ),
                ),
              ),
               SizedBox(height: 60),
              ElevatedButton(
                
                style: ElevatedButton.styleFrom(backgroundColor: Color.fromRGBO(140, 240, 209, 1)),
                onPressed: login,
                child: const Center(child: Text('Войти', style: TextStyle(color: Color.fromRGBO(4, 4, 4, 1), fontFamily: 'Ubuntu', fontSize: 20),)),
              ),
              const SizedBox(height: 42),
              TextButton(
                onPressed: () => Navigator.of(context).pushNamed('/signup'),
                child: const Text(
                  'Регистрация',
                  style: TextStyle(
                    decoration: TextDecoration.underline,
                    color: Color.fromRGBO(217, 217, 217, 1), fontFamily: 'Ubuntu', fontSize: 16
                  ),
                ),
              ),
              TextButton(
                onPressed: () =>
                    Navigator.of(context).pushNamed('/reset_password'),
                child: const Text('Сбросить пароль', style: TextStyle(color: Color.fromRGBO(217, 217, 217, 1), fontFamily: 'Ubuntu', fontSize: 16),),
              ),
            ],
          ),
        ),
      ),
    );
  }
}