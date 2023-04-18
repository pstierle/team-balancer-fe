import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
  public playerForm = this.formBuilder.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
  });

  @ViewChild(MatExpansionPanel)
  private expansionPanel!: MatExpansionPanel;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public async submit(): Promise<void> {
    console.log();
    if (this.playerForm.controls.name.value) {
      try {
        await this.apiService.createPlayer(this.playerForm.controls.name.value);
        await this.apiService.getPlayers();
        this.expansionPanel.close();
        this.playerForm.controls.name.patchValue('');
        this.playerForm.controls.name.markAsUntouched();
        this.playerForm.controls.name.setErrors(null);
        this.snackBar.open('Successfully created new Player', '', {
          duration: 3000,
        });
      } catch (e) {
        this.snackBar.open('Something went wrong..', '', {
          duration: 3000,
        });
      }
    }
  }
}
