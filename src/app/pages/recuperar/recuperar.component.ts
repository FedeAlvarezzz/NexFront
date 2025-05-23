import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-recuperar',
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent {
  
  // Panel control
  currentPanel: 'email' | 'code' = 'email';
  
  // Email panel properties
  email: string = '';
  isLoading: boolean = false;
  
  // Code panel properties
  codeDigits: string[] = ['', '', '', '', '', ''];
  codeInstruction: string = 'Hemos enviado un código de 6 dígitos a tu correo electrónico. Por favor, ingresa el código para continuar.';
  isVerifying: boolean = false;
  
  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor() { }

  /**
   * Sends verification code to email
   */
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

    // Simulate API call
    setTimeout(() => {
      this.codeInstruction = `Hemos enviado un código de 6 dígitos a ${this.email}. Por favor, ingresa el código para continuar.`;
      this.currentPanel = 'code';
      this.isLoading = false;
      
      // Focus first code input after panel transition
      setTimeout(() => {
        this.focusCodeInput(0);
      }, 300);
    }, 2000);
  }

  /**
   * Goes back to email panel
   */
  goBack(): void {
    this.currentPanel = 'email';
    this.clearCodeInputs();
    
    // Focus email input after panel transition
    setTimeout(() => {
      if (this.emailInput) {
        this.emailInput.nativeElement.focus();
      }
    }, 300);
  }

  /**
   * Verifies code and proceeds to change password
   */
  changePassword(): void {
    const code = this.getFullCode();
    
    if (code.length !== 6) {
      alert('Por favor, ingresa el código completo de 6 dígitos');
      return;
    }

    this.isVerifying = true;

    // Simulate API call
    setTimeout(() => {
      alert('Código verificado correctamente. Redirigiendo para cambiar contraseña...');
      this.isVerifying = false;
      
      // Here you would redirect to the password change form
      console.log('Redirecting to password change form...');
      
      // Example: this.router.navigate(['/change-password'], { queryParams: { email: this.email, code: code } });
    }, 2000);
  }

  /**
   * Handles input in code fields
   */
  onCodeInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    // Only allow numbers
    if (!/^\d$/.test(value)) {
      this.codeDigits[index] = '';
      return;
    }

    this.codeDigits[index] = value;

    // Move to next input if current is filled
    if (value && index < 5) {
      this.focusCodeInput(index + 1);
    }
  }

  /**
   * Handles keydown events in code fields
   */
  onCodeKeyDown(event: KeyboardEvent, index: number): void {
    // Handle backspace
    if (event.key === 'Backspace') {
      if (!this.codeDigits[index] && index > 0) {
        this.focusCodeInput(index - 1);
      }
    }
    
    // Handle arrow keys
    if (event.key === 'ArrowLeft' && index > 0) {
      this.focusCodeInput(index - 1);
    }
    if (event.key === 'ArrowRight' && index < 5) {
      this.focusCodeInput(index + 1);
    }
  }

  /**
   * Handles paste events in code fields
   */
  onCodePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const paste = event.clipboardData?.getData('text') || '';
    const digits = paste.replace(/\D/g, '').slice(0, 6);
    
    for (let i = 0; i < digits.length; i++) {
      if (i < 6) {
        this.codeDigits[i] = digits[i];
      }
    }
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(digits.length, 5);
    this.focusCodeInput(nextIndex);
  }

  /**
   * Handles Enter key press in email field
   */
  onEmailKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendCode();
    }
  }

  /**
   * Focuses a specific code input by index
   */
  private focusCodeInput(index: number): void {
    setTimeout(() => {
      const input = document.getElementById(`code-${index}`) as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 50);
  }

  /**
   * Clears all code inputs
   */
  private clearCodeInputs(): void {
    this.codeDigits = ['', '', '', '', '', ''];
  }

  /**
   * Gets the complete code from all inputs
   */
  private getFullCode(): string {
    return this.codeDigits.join('');
  }

  /**
   * Validates email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}