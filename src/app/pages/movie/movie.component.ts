import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  formMovie: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get nameInvalid() {
    return this.formMovie.get('name').invalid && this.formMovie.get('name').touched;
  }

  get descriptionInvalid() {
    return this.formMovie.get('description').invalid && this.formMovie.get('description').touched;
  }

  get imageInvalid() {
    return this.formMovie.get('image').invalid && this.formMovie.get('image').touched;
  }

  get actorsInvalid() {
    return this.formMovie.get('actors').invalid && this.formMovie.get('actors').touched;
  }

  get genderIdInvalid() {
    return this.formMovie.get('genderId').invalid && this.formMovie.get('genderId').touched;
  }

  get releaseDateInvalid() {
    return this.formMovie.get('releaseDate').invalid && this.formMovie.get('releaseDate').touched;
  }

  createForm() {
    this.formMovie = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
      actors: ['', [Validators.required, Validators.minLength(3)]],
      genderId: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]]
    });
  }

  createMovie() {
    if (this.formMovie.invalid) {
      return Object.values(this.formMovie.controls)
        .forEach(control => {
          control.markAsTouched();
        });
    }
  }


}
