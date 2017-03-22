import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {RolesService} from "../_services/roles.service";
import {TercerosService} from "../_services/terceros.service";
import {Rol} from "../_models/rol";
import {Tercero} from "../_models/tercero";
import {Usuario} from "../_models/usuario";
import {UsuariosService} from "../_services/usuarios.service";
import {RolCantidad} from "../_models/RolCantidad";
import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  selector: 'dashboard',
  styleUrls: ['dashboard.css'],
})
export class DashboardComponent implements OnInit {

  usuariosActivos: number = 0;
  usuariosInactivos: number = 0;
  listaUsuarios: Usuario[];
  data: any;
  cantidadUsuarios: number[] = [];
  roles: string[] = [];
  rolCantidad: RolCantidad[];
  isData: boolean = false;
  funcionalidades: boolean = true;
  rolesSistema: boolean = true;
  usuariosAct: boolean = true;
  widgets: any[] = [];
  usuariosTitle:string;


  constructor(private router: Router, private rolesService: RolesService, private  tercerosServices: TercerosService,
              private usuarioService: UsuariosService,
              private _translate:TranslateService
    ) {

    usuarioService.listUsers().subscribe(res => {
      this.listaUsuarios = res;
      for (let u of this.listaUsuarios) {
        if (u.indicadorHabilitado) {
          this.usuariosActivos++;
        } else {
          this.usuariosInactivos++;
        }
      }
    });

    this.refreshText();

  }


  ngOnInit(): void {
    this.rolesService.getDashboardData().subscribe(res => {
      this.rolCantidad = res;
      for (let rc of this.rolCantidad) {
        this.roles.push(rc.rol);
        this.cantidadUsuarios.push(rc.cantidad);
      }
      this.data = {
        labels: this.roles,
        datasets: [
          {
            data: this.cantidadUsuarios,
            backgroundColor: [
              "#32CD32",
              "#8A2BE2",
              "#A52A2A",
              "#DEB887",
              "#5F9EA0",
              "#7FFF00",
              "#D2691E",
              "#FF7F50",
              "#6495ED",
              "#DC143C",
              "#00FFFF",
              "#00008B",
              "#008B8B",
              "#B8860B",
              "#A9A9A9",
              "#A9A9A9",
              "#006400",
              "#BDB76B",
              "#8B008B",
              "#556B2F",
              "#FF8C00",
              "#9932CC",
              "#8B0000",
              "#E9967A",
              "#8FBC8F",
              "#483D8B",
              "#2F4F4F",
              "#2F4F4F",
              "#00CED1",
              "#9400D3",
              "#FF1493",
              "#00BFFF",
              "#696969",
              "#696969",
              "#1E90FF",
              "#B22222",
              "#228B22",
              "#FF00FF",
              "#DCDCDC",
              "#FFD700",
              "#DAA520",
              "#808080",
              "#808080",
              "#008000",
              "#ADFF2F",
              "#FF69B4",
              "#CD5C5C",
              "#4B0082",
              "#FFFFF0",
              "#F0E68C",
              "#E6E6FA",
              "#7CFC00",
              "#FFFACD",
              "#ADD8E6",
              "#F08080",
              "#E0FFFF",
              "#FAFAD2",
              "#D3D3D3",
              "#90EE90",
              "#D3D3D3",
            ]
          }]

      }
      this.isData = true;
    });

  }


  user() {
    this.router.navigate(['usuarios']);
  }

  goBack() {
    this.router.navigate(['dashboard'])
  }

  go(data: any) {
    switch (data) {
      case "usuarios":
        this.router.navigate(["usuarios"]);
        break;
      case "centroCostos":
        this.router.navigate(["centroCostos"]);
        break;
      case "constantes":
        this.router.navigate(["constantes"]);
        break;
      case "listas":
        this.router.navigate(["listas"]);
        break;
      case "gruposGestion":
        this.router.navigate(["gruposGestion"]);
        break;
      case "tipoArea":
        this.router.navigate(["tipoArea"]);
        break;
      case "divisionPolitica":
        this.router.navigate(["divisionPolitica"]);
        break;
      case "ocupaciones":
        this.router.navigate(["ocupaciones"]);
        break;
      case "actividadeconomica":
        this.router.navigate(["actividadeconomica"]);
        break;
    }
  }
  refreshText() {
    this._translate.get('Usuarios del Sistema').subscribe((res: string) => {
      this.usuariosTitle = res;
    });
  }

}