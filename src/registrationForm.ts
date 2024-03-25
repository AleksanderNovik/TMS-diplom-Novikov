export class RegistrationForm {
    
    private email: string;
    private password: string;
    private username: string;
    private age: number;
    private termsAgreement: boolean = false;
    private registered: boolean = false;

    get Email() {
        return this.email;
    }

    get Password() {
        return this.password;
    }

    get Username() {
        return this.username;
    }

    get Age() {
        return this.age;
    }

    get TermsAgreement() {
        return this.termsAgreement
    }

    get Registered() {
        return this.registered;
    }

    setEmail(email: string): void {
    const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegular.test(email)) {
         this.email = email;
      } else {
        throw new Error("Invalid email");
     }
    }

    setPassword(password: string): void {
        if(password.length >= 8 && /\d/.test(password)) {  //не красиво как то описано условие, что должна быть цифра 
            this.password = password;
        } else {
            throw new Error("Invalid password");
        }
    }

    setUsername(username: string): void {
        if(username.trim() != "") {
            this.username = username;
        } else {
            throw new Error("Invalid username");
        }
    }

    setAge(age: number): void {
        if(age > 0 && age < 150) {
            this.age = age;
        } else {
            throw new Error("Invalid age");
        }
    }

    agreeWithTerms(): void {
        this.termsAgreement = true;
    }

    register(): string {
        if (this.email && this.password && this.username && this.age && this.termsAgreement) {
            this.registered = true;
            const registrationDate = new Date().toLocaleString();
            return `Регистрация прошла успешно. Дата и время: ${registrationDate}`;
        } else {
            let errorMessage = "Ошибка при регистрации:";
            if (!this.email) errorMessage += "\n- Некорректный email";
            if (!this.password) errorMessage += "\n- Пароль должен содержать не менее 8 символов и хотя бы одну цифру";
            if (!this.username) errorMessage += "\n- Имя пользователя не должно быть пустым";
            if (!this.age) errorMessage += "\n- Некорректный возраст";
            if (!this.termsAgreement) errorMessage += "\n- Необходимо согласиться с условиями";
            return errorMessage;
    }
}
}