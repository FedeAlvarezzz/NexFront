import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {

  currentPanel: 'email' | 'code' = 'email';

  email: string = '';
  isLoading: boolean = false;

  codeDigits: string[] = Array(6).fill('');
  codeInstruction: string = 'A 6-digit code has been sent to your email. Enter it to continue.';
  isVerifying: boolean = false;

  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor() {}

  sendCode(): void {
    if (!this.email.trim()) {
      alert('Por favor, ingresa tu correo electrónico');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      alert('Por favor, ingresa un correo electrónico válido');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.codeInstruction = `A 6-digit code has been sent to your email ${this.email}. Enter it to continue.`;
      this.currentPanel = 'code';
      this.isLoading = false;

      setTimeout(() => this.focusCodeInput(0), 300);
    }, 2000);
  }

  goBack(): void {
    this.currentPanel = 'email';
    this.clearCodeInputs();
    setTimeout(() => this.emailInput?.nativeElement.focus(), 300);
  }

  changePassword(): void {
    const code = this.getFullCode();

    if (code.length !== 6) {
      alert('Por favor, ingresa el código completo de 6 dígitos');
      return;
    }

    this.isVerifying = true;

    setTimeout(() => {
      alert('Code successfully verified. Redirecting to change password...');
      this.isVerifying = false;
      console.log('Redirecting to password change form...');
    }, 2000);
  }

  onCodeInput(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').charAt(0); // Solo 1 dígito

    input.value = value;
    this.codeDigits[index] = value;

    if (value && index < 5) {
      this.focusCodeInput(index + 1);
    }

    // Autoverificar si ya está completo
    if (this.getFullCode().length === 6) {
      console.log('Código completo:', this.getFullCode());
      // this.changePassword(); // ← descomenta si quieres autoenviar
    }
  }

  onCodeKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        this.focusCodeInput(index - 1);
        setTimeout(() => {
          const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
          if (prevInput) {
            prevInput.value = '';
            this.codeDigits[index - 1] = '';
          }
        }, 50);
      }
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      this.focusCodeInput(index - 1);
    }

    if (event.key === 'ArrowRight' && index < 5) {
      this.focusCodeInput(index + 1);
    }
  }

  onCodePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');

    digits.forEach((digit, i) => {
      this.codeDigits[i] = digit;
      const input = document.getElementById(`code-${i}`) as HTMLInputElement;
      if (input) input.value = digit;
    });

    this.focusCodeInput(Math.min(digits.length, 5));
  }

  onEmailKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.sendCode();
  }

  private focusCodeInput(index: number): void {
    setTimeout(() => {
      const input = document.getElementById(`code-${index}`) as HTMLInputElement;
      if (input) input.focus();
    }, 50);
  }

  private clearCodeInputs(): void {
    this.codeDigits = Array(6).fill('');
    for (let i = 0; i < 6; i++) {
      const input = document.getElementById(`code-${i}`) as HTMLInputElement;
      if (input) input.value = '';
    }
  }

  private getFullCode(): string {
    return this.codeDigits.join('');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
