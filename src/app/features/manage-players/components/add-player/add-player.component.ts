import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreatePlayer } from 'src/app/state/manage-players.state';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent {
  public playerForm = this.formBuilder.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
  });

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  public async submit(): Promise<void> {
    if (this.playerForm.controls.name.value) {
      this.store.dispatch(
        new CreatePlayer({
          name: this.playerForm.controls.name.value,
        })
      );
      this.playerForm.controls.name.patchValue('');
      this.playerForm.setErrors(null);
    }
  }
}
