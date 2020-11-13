import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderModel } from 'src/app/models/gender.model';
import { MovieModel } from 'src/app/models/movie.model';
import { GenderService } from 'src/app/services/gender.service';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  formMovie: FormGroup;
  genders: GenderModel[] = [];
  movies: MovieModel[] = [];

  constructor(
    private fb: FormBuilder,
    private genderService: GenderService,
    private movieService: MovieService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.genderService.getGenders()
      .subscribe((genders: GenderModel[]) => {
        this.genders = genders;
      });

    this.getMovies();
  }

  private getMovies() {
    this.movieService.getMovies()
      .subscribe((movies: MovieModel[]) => {
        this.movies = movies;
      });
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

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Por favor espere...'
    });

    Swal.showLoading();

    this.movieService.save(this.formMovie.value)
      .subscribe(resp => {
        this.formMovie.reset({
          name: '',
          description: '',
          image: '',
          actors: '',
          genderId: '',
          releaseDate: ''
        });
        Swal.close();
        this.getMovies();
      }, (err) => {
        Swal.close();
        Swal.fire({
          title: 'Error al guardar',
          icon: 'error',
          text: err.error.message
        });
      });
  }

  deleteMovie(id: number) {
    Swal.fire({
      title: 'Guardar pelicula',
      icon: 'info',
      text: '¿Está seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((resp) => {
      if (resp.value) {
        this.movieService.delete(id)
          .subscribe(() => {
            Swal.close();
            Swal.fire({
              title: 'Información',
              icon: 'info',
              text: 'Registro eliminado con éxito'
            }).then(() => {
              this.getMovies();
            })
          }, () => {
            Swal.close();
            Swal.fire({
              title: 'Error al eliminar',
              icon: 'error',
              text: 'Se presentó un error al eliminar'
            });
          });
      }
    });
  }


}
