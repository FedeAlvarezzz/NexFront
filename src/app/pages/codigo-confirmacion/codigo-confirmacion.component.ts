import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-codigo-confirmacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './codigo-confirmacion.component.html',
  styleUrls: ['./codigo-confirmacion.component.css']
})
export class CodigoConfirmacionComponent {
  codeLength = 6;
  code: string[] = Array(this.codeLength).fill('');

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Permitir solo números
    if (/^\d$/.test(value)) {
      this.code[index] = value;
      input.value = value;

      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    } else {
      input.value = '';
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // Permitir solo teclas válidas
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }

    // Mover al anterior si se borra
    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const digits = pastedText.replace(/\D/g, '').split('');

    digits.slice(0, this.codeLength).forEach((digit, i) => {
      const input = document.getElementById(`code-${i}`) as HTMLInputElement;
      if (input) {
        input.value = digit;
        this.code[i] = digit;
      }
    });

    const nextInput = document.getElementById(`code-${digits.length}`) as HTMLInputElement;
    if (nextInput) nextInput.focus();
  }
}
