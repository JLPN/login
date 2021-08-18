import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, RespuestaParametroGeneral } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public login: Login;
  public forma: FormGroup;
  public bloquearSubmit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.login = {
      idUsuario: '',
      clave: '',
    };
  }

  ngOnInit(): void {
    localStorage.clear();
    this.initValidatorsForm();
  }

  initValidatorsForm() {
    this.forma = this.fb.group({
      idUsuario: ['',[
          Validators.required,
          Validators.pattern('[a-zA-Z0-9\._%+-]+@[a-zA-Z0-9-]+[\.]{1}[A-Za-z]{2,3}'),
        ],
      ],
      clave: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmitFormLogin() {
    if(this.bloquearSubmit == true){
      return false;
    }
    this.bloquearSubmit = true;

    if (this.comprobarFormulario() == false) {
      this.bloquearSubmit = false;
      return false;
    } else {
      let login = this.login;
      login.clave = this.forma.value.clave;
      login.idUsuario = this.forma.value.idUsuario;
      localStorage.setItem('idUsuario', login.idUsuario);
      this.bloquearSubmit = false;
      this.loguear();
    }
  }

  loguear() {
    this.loginService.login(this.login).subscribe(
      (res: RespuestaParametroGeneral) => {
        console.log(res);
        if(res.object == null || res.object == '' || res.object == undefined) {
          this.llamarModal('Error al Iniciar Sesión', 'Usuario y/o contraseña incorrecta', 'Aceptar');
           this.router.navigate(['/login']);
        }else {
           let access_token = (<any>res).object;
           localStorage.setItem('access_token', access_token);
           this.router.navigate(['/resultado']);
        }
      },
      (err) => {
        if (err.status === 401) {
          this.llamarModal('Error al Iniciar Sesión', 'Usuario y/o contraseña incorrecta', 'Aceptar');
        } else {
          //this.llamarModal('Error al Iniciar Sesión', 'Ha ocurrido un error inesperado', 'Aceptar');
          //El servicio llega acá por que se borraron las rutas de la api de login.
          //puedes ver la url correcta en el vídeo o usar una de tu organización
          //luego ver por consola la respuesta del servicio y consumirlo según el data devuelto.
          this.router.navigate(['/resultado']);

        }
        localStorage.clear();
      }
);
  }

  comprobarFormulario() {
    if (this.forma.invalid) {
      return false;
    }
  }

  get correoIncorrecto() {
    return this.forma.get('idUsuario').invalid && this.forma.get('idUsuario').touched;
  }

  get passIncorrecto() {
    return (
      this.forma.get('clave').invalid && this.forma.get('clave').touched
    );
  }

  llamarModal(titulo: string, mensaje: string, boton: string){
    alert(titulo + ' - ' + mensaje);
  }
}

