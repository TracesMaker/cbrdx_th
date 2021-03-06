/**
 * Created by TracesMaker on 08/02/2017.
 */
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export let fakeBackendProvider = {
   //  use fake backend in place of Http service for backend-less development
   provide: Http,
   useFactory: ( backend: MockBackend, options: BaseRequestOptions ) => {

      let employees: any[] = JSON.parse( localStorage.getItem( 'employees' ) ) || [
            {
               'idColaborador': '1',

               'numeroDocumento': '1098936874',
               'primerNombre': 'Luis',
               'segundoNombre': 'Enrrique',
               'primerApellido': 'Gomez',
               'segundoApellido': 'Ramirez',
               'tipoDocumento': { 'value': '1', 'label': 'CC' },
               'Avatar': 'fotico.png',
               'ciudadExpedicion': { 'value': '1', 'label': 'Bucaramanga' },
               'fechaExp': '1 de mayo de 2010',
               'fechaNacimiento': '12/12/1991',
               'idtercero': '12',
               'ciudadNacimiento': { 'value': '2', 'label': 'Bogota' },
               'nacionalidad': 'Colombiano',
               'genero': { 'value': '1', 'label': 'Masculino' },
               'estadoCivil': { 'value': '1', 'label': 'Soltero' },
               'factorrh': 'O+',
               'numeroDeHijos': '5',
               'lateralidad': 'D',
               'nivelEducativo': 'Pregrado',
               'profesion': 'Orientador',
               'estratoSocioEconomico': '3',
               'vivienda': 'Arrendada',
               'vehiculo': 'Propio',
               'tallaCamisa': 'M',
               'tallaPantalon': '32',
               'tallaCalzado': '38',
               'fechaDesde': '2011-05-11',
               'cargoActual': 'Ejecutivo Comercial'
            },

            {
               'idColaborador': '2',
               'numeroDocumento': '91256964',
               'primerNombre': 'Miguel',
               'segundoNombre': 'Alejandro',
               'primerApellido': 'Fernandez',
               'segundoApellido': 'Lopera',
               'tipoDocumento': { 'value': '1', 'label': 'CC' },
               'Avatar': 'fotico.png',
               'ciudadExpedicion': { 'value': '1', 'label': 'Bucaramanga' },
               'fechaExp': '1 de mayo de 2010',
               'fechaNacimiento': '12/12/1991',
               'idtercero': '12',
               'ciudadNacimiento': { 'value': '2', 'label': 'Bogota' },
               'nacionalidad': 'Colombiano',
               'genero': { 'value': '1', 'label': 'Masculino' },
               'estadoCivil': { 'value': '1', 'label': 'Soltero' },
               'factorrh': 'O+',
               'numeroDeHijos': '5',
               'lateralidad': 'D',
               'nivelEducativo': 'Pregrado',
               'profesion': 'Orientador',
               'estratoSocioEconomico': '3',
               'vivienda': 'Arrendada',
               'vehiculo': 'Propio',
               'tallaCamisa': 'L',
               'tallaPantalon': '36',
               'tallaCalzado': '40',
               'fechaDesde': '2012-05-12',
               'cargoActual': 'Asesor'
            },

            {
               'idColaborador': '3',
               'numeroDocumento': '63859741',
               'primerNombre': 'Juana',
               'segundoNombre': 'Maria',
               'primerApellido': 'Díaz',
               'segundoApellido': 'Rodriguez',
               'tipoDocumento': { 'value': '1', 'label': 'CC' },
               'Avatar': 'fotico.png',
               'ciudadExpedicion': { 'value': '1', 'label': 'Bucaramanga' },
               'fechaExp': '1 de mayo de 2010',
               'fechaNacimiento': '12/12/1991',
               'idtercero': '12',
               'ciudadNacimiento': { 'value': '2', 'label': 'Bogota' },
               'nacionalidad': 'Colombiano',
               'genero': { 'value': '1', 'label': 'Masculino' },
               'estadoCivil': { 'value': '1', 'label': 'Soltero' },
               'factorrh': 'O+',
               'numeroDeHijos': '5',
               'lateralidad': 'D',
               'nivelEducativo': 'Pregrado',
               'profesion': 'Orientador',
               'estratoSocioEconomico': '3',
               'vivienda': 'Arrendada',
               'vehiculo': 'Propio',
               'tallaCamisa': 'S',
               'tallaPantalon': '8',
               'tallaCalzado': '36',
               'fechaDesde': '2013-05-13',
               'cargoActual': 'Ejecutiva'
            },

            {
               'idColaborador': '4',
               'numeroDocumento': '63258159',
               'primerNombre': 'Martha',
               'segundoNombre': 'Sofia',
               'primerApellido': 'Sepulveda',
               'segundoApellido': 'Blanco',
               'tipoDocumento': { 'value': '1', 'label': 'CC' },
               'Avatar': 'fotico.png',
               'ciudadExpedicion': { 'value': '1', 'label': 'Bucaramanga' },
               'fechaExp': '1 de mayo de 2010',
               'fechaNacimiento': '12/12/1991',
               'idtercero': '12',
               'ciudadNacimiento': { 'value': '2', 'label': 'Bogota' },
               'nacionalidad': 'Colombiano',
               'genero': { 'value': '1', 'label': 'Masculino' },
               'estadoCivil': { 'value': '1', 'label': 'Soltero' },
               'factorrh': 'O+',
               'numeroDeHijos': '5',
               'lateralidad': 'D',
               'nivelEducativo': 'Pregrado',
               'profesion': 'Orientador',
               'estratoSocioEconomico': '3',
               'vivienda': 'Arrendada',
               'vehiculo': 'Propio',
               'tallaCamisa': 'M',
               'tallaPantalon': '10',
               'tallaCalzado': '38',
               'fechaDesde': '2014-05-14',
               'cargoActual': 'Ejecutiva'
            }

         ];

      let familys: any[] = JSON.parse( localStorage.getItem( 'familys' ) )
                           || [

            {
               'idFamiliar': '1',
               'idColaborador': '1',
               'tipoDeDocumento': { 'value': '1', 'label': 'Cédula de Ciudadania' },
               'numeroDeDocumento': '1098154874',
               'primerNombre': 'Maria',
               'segundoNombre': 'Alejandra',
               'primerApellido': 'Gomez',
               'segundoApellido': 'Reatiga',
               'fechadeNacimiento': '01/02/2009',
               'parentesco': { 'value': '2', 'label': 'Madre' },
               'correoElectronico': 'mariagomez@gmail.com',
               'telefono1': '3214569874',
               'telefono2': '6531887',
               'direccionDeResidencia': 'Calle 40 No. 21-56',
               'convive': '1'
            },
            {
               'idFamiliar': '2',
               'idColaborador': '1',
               'tipoDeDocumento': { 'value': '1', 'label': 'Cédula de Ciudadania' },
               'numeroDeDocumento': '1098564821',
               'primerNombre': 'Catalina',
               'segundoNombre': '',
               'primerApellido': 'Mejia',
               'segundoApellido': 'Lopez',
               'fechadeNacimiento': '01/02/2009',
               'parentesco': { 'value': '2', 'label': 'Madre' },
               'correoElectronico': 'catalinamejia@gmail.com',
               'telefono1': '6598741',
               'telefono2': '3159874563',
               'direccionDeResidencia': 'Calle 15 No. 25-15',
               'convive': '2'
            },

            {
               'idFamiliar': '3',
               'idColaborador': '1',
               'tipoDeDocumento': { 'value': '1', 'label': 'Cédula de Ciudadania' },
               'numeroDeDocumento': '1098654987',
               'primerNombre': 'Jairo',
               'segundoNombre': 'Jose',
               'primerApellido': 'Sepulveda',
               'segundoApellido': 'Blanco',
               'fechadeNacimiento': '01/02/2009',
               'parentesco': { 'value': '1', 'label': 'Padre' },
               'correoElectronico': 'josesepulveda@gmail.com',
               'telefono1': '3',
               'telefono2': '3',
               'direccionDeResidencia': '3',
               'convive': '3'
            }

         ];

      let references: any[] = JSON.parse( localStorage.getItem( 'references' ) )
                              || [

            {

               'idReferencia': '1',
               'idColaborador': '1',
               'tipodeReferencia': { value: 1, label: 'Laboral' },
               'empresa': 'Gobernación de Santander',
               'primerNombre': 'Maria',
               'segundoNombre': 'Angelica',
               'primerApellido': 'Diaz',
               'segundoApellido': 'Ramirez',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'telefono': '6597842',
               'celular': '3215874125',
               'direccion': 'Calle 5 No. 19-25'
            },

            {

               'idReferencia': '2',
               'idColaborador': '1',
               'tipodeReferencia': { value: 1, label: 'Laboral' },
               'empresa': 'ESSA',
               'primerNombre': 'Alexander',
               'segundoNombre': '',
               'primerApellido': 'Ramirez',
               'segundoApellido': '',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'telefono': '6597841',
               'celular': '3168945217',
               'direccion': 'Cra 15 No. 26-87'
            },

            {

               'idReferencia': '3',
               'tipodeReferencia': { value: 2, label: 'Familiar' },
               'empresa': '',
               'primerNombre': 'Katherine',
               'segundoNombre': '',
               'primerApellido': 'Gomez',
               'segundoApellido': 'Velazquez',
               'ciudad': { value: 1, label: 'Girón' },
               'telefono': '3159874158',
               'celular': '3216987451',
               'direccion': 'Cra 2 No. 12-98'
            }
         ];

      let fstudies: any[] = JSON.parse( localStorage.getItem( 'fstudies' ) )
                            || [

            {

               'idEstudio': '1',
               'idColaborador': '1',
               'titulo': 'Laboral',
               'ingreso': '2 de mayo del 1999',
               'finalizacion': '2 de mayo del 2005',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'institucion': { value: 1, label: 'uis' },
               'confirmada': true,
               'nivelEstudio': { value: 1, label: 'Universitario' },
               'areaEstudio': { value: 1, label: 'Diplomado' },
               'otraInstitucion': '',
               'estadoEstudio': { value: 1, label: 'Culminado' },
            },

            {

               'idEstudio': '2',
               'idColaborador': '1',
               'titulo': 'Abogado',
               'ingreso': '2 de mayo del 1999',
               'finalizacion': '2 de mayo del 2005',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'institucion': { value: 1, label: 'UPB' },
               'confirmada': false,
               'nivelEstudio': { value: 1, label: 'Universitario' },
               'areaEstudio': { value: 1, label: 'Diplomado' },
               'otraInstitucion': '',
               'estadoEstudio': { value: 1, label: 'Culminado' },
            },

            {

               'idEstudio': '3',
               'idColaborador': '1',
               'titulo': 'ingeniero',
               'ingreso': '2 de mayo del 1999',
               'finalizacion': '2 de mayo del 2005',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'institucion': { value: 1, label: 'uis' },
               'confirmada': true,
               'nivelEstudio': { value: 1, label: 'Universitario' },
               'areaEstudio': { value: 1, label: 'Diplomado' },
               'otraInstitucion': '',
               'estadoEstudio': { value: 1, label: 'Culminado' },
            }
         ];

      let nfstudies: any[] = JSON.parse( localStorage.getItem( 'nfstudies' ) )
                             || [

            {
               'idEstudio': '1',
               'idColaborador': '1',
               'titulo': 'Laboral',
               'ingreso': '10/10/2010',
               'finalizacion': '10/20/2010',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'institucion': 'sagrado corazón de jesus',
               'confirmada': true,
               'tipoEstudio': { value: 1, label: 'Diplomado' },
               'otroTipoEstudio': ' Otro tipo',
               'intensidad': { value: 1, label: '20 horas' },
               'descripcion': 'Un cursito para aprender algo',
               'areaEstudio': { value: 1, label: 'Diplomado' },
               'estadoEstudio': { value: 1, label: ' Terminado' },
            },

            {

               'idEstudio': '2',
               'idColaborador': '1',
               'titulo': 'Abogado',
               'ingreso': '10/10/2010',
               'finalizacion': '10/20/2010',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'institucion': 'sagrado corazón de jesus',
               'confirmada': false,
               'tipoEstudio': { value: 1, label: 'Diplomado' },
               'otroTipoEstudio': ' Otro tipo',
               'intensidad': { value: 1, label: '20 horas' },
               'descripcion': 'Un cursito para aprender algo',
               'areaEstudio': { value: 1, label: 'Diplomado' },
               'estadoEstudio': { value: 1, label: ' Terminado' },
            },

            {

               'idEstudio': '3',
               'idColaborador': '1',
               'titulo': 'ingeniero',
               'ingreso': '10/10/2010',
               'finalizacion': '10/20/2010',
               'ciudad': { value: 1, label: 'Bucaramanga' },
               'institucion': 'sagrado corazón de jesus',
               'confirmada': false,
               'tipoEstudio': { value: 1, label: 'Diplomado' },
               'otroTipoEstudio': ' Otro tipo',
               'intensidad': { value: 1, label: '20 horas' },
               'descripcion': 'Un cursito para aprender algo',
               'areaEstudio': { value: 1, label: 'Diplomado' },
               'estadoEstudio': { value: 1, label: ' Terminado' },
            }
         ];

      let experiences: any[] = JSON.parse( localStorage.getItem( 'experience' ) )
                               || [

            {
               'idExperiencia': '1',
               'idColaborador': '1',
               'empresa': 'Crezcamos',
               'cargo': 'Gerente',
               'ingreso': '10/10/2000',
               'finalizacion': '10/10/2010',
               'ciudad': { value: 104, label: 'Bucaramanga' },
               'telefonoEmpresa': '6020304',
               'sectorEmpresa': 1,
               'subsectorEmpresa': 2,
               'nivelCargo': 'Nivel Cargo A',
               'areaCargo': 'Area A',
               'jefeInmediato': 'Benito Gomez',
               'tiempoExperiencia': '10 Meses',
               'actualmente': '1'
            },
            {
               'idExperiencia': '2',
               'idColaborador': '1',
               'empresa': 'Ciberdix',
               'cargo': 'Gerente',
               'ingreso': '10/10/2010',
               'finalizacion': '10/10/2016',
               'ciudad': { value: 101, label: 'Floridablanca' },
               'telefonoEmpresa': '6010203',
               'sectorEmpresa': 2,
               'subsectorEmpresa': 3,
               'nivelCargo': 'Nivel Cargo B',
               'areaCargo': 'Area B',
               'jefeInmediato': 'Filoberto Garcia',
               'tiempoExperiencia': '3 Años',
               'actualmente': '0'
            },
            {
               'idExperiencia': '3',
               'idColaborador': '1',
               'empresa': 'Empresa SAS',
               'cargo': 'Gerente',
               'ingreso': '10/10/2010',
               'finalizacion': '10/10/2010',
               'ciudad': { value: 104, label: 'Bucaramanga' },
               'telefonoEmpresa': '6101010',
               'sectorEmpresa': 2,
               'subsectorEmpresa': 4,
               'nivelCargo': 'Nivel Cargo C',
               'areaCargo': 'Area B',
               'jefeInmediato': 'Armando Casas',
               'tiempoExperiencia': '2 Años',
               'actualmente': '0'
            }
         ];

      let locations: any[] = JSON.parse( localStorage.getItem( 'locations' ) ) ||
         [
            {
               'idUbicacion': '1',
               'ciudad': { 'value': 103, 'label': 'Bucaramanga' },
               'departamento': { 'value': 3, 'label': 'Santander' },
               'pais': { 'value': 3, 'label': 'Colombia' },
               'direccion': 'Diagonal 14 # 32 - 32 Torre 1 Apartamento 4 ',
               'tipoDireccion': { 'value': 2, 'label': 'Comercial' },
               'barrio': 'San Alonso',
               'correoElectronico': 'estecorreo@gmail.com',
               'longitud': '-73.11609329999999',
               'latitud': '7.1344315',
               'comoLlegar': 'caminando',
               'celular': '3008442354',
               'telefono': '6352354',
            },
            {
               'idUbicacion': '2',
               'ciudad': { 'value': 102, 'label': 'Bucaramanga' },
               'departamento': { 'value': 4, 'label': 'Santander' },
               'pais': { 'value': 1, 'label': 'Colombia' },
               'direccion': 'Cra 14 # 32 - 32 Torre 1',
               'tipoDireccion': { 'value': 2, 'label': 'Comercial' },
               'barrio': 'Alarcon',
               'correoElectronico': 'estecorreo@gmail.com',
               'longitud': '-73.11609329999999',
               'latitud': '7.1344315',
               'comoLlegar': 'caminando',
               'celular': '3008442354',
               'telefono': '6352354',
            },
            {
               'idUbicacion': '3',
               'ciudad': { 'value': 103, 'label': 'Bucaramanga' },
               'departamento': { 'value': 4, 'label': 'Santander' },
               'pais': { 'value': 1, 'label': 'Colombia' },
               'direccion': 'calle 14 # 32 - 32 Torre 1',
               'tipoDireccion': { 'value': 3, 'label': 'Comercial' },
               'barrio': 'Alarcon',
               'correoElectronico': 'estecorreo@gmail.com',
               'longitud': '-73.11609329999999',
               'latitud': '7.1344315',
               'comoLlegar': 'caminando',
               'celular': '3008442354',
               'telefono': '6352354',
            }
         ];

      let principalNomenclatureList = [
         { label: 'Seleccione', value: null },
         { label: 'Carrera', value: 1 },
         { label: 'Calle', value: 2 },
         { label: 'Diagonal', value: 3 },
         { label: 'Avenida', value: 4 }
      ];

      let complementaryNomenclatureList = [
         { label: 'Seleccione', value: null },
         { label: 'Casa', value: 'Casa' },
         { label: 'Torre', value: 'Torre' },
         { label: 'Apartamento', value: 'Apartamento' },
         { label: 'Manzana', value: 'Manzana' }
      ];

      let addressTypeList = [
         { label: 'Seleccione', value: null },
         { label: 'Residencial', value: '1' },
         { label: 'Comercial', value: '2' }
      ];

      let studyLevelList = [
         { label: 'Seleccione', value: null },
         { label: 'Pre-escolar', value: '1' },
         { label: 'Primara', value: '2' },
         { label: 'Secundaria', value: '3' },
         { label: 'Pregrado', value: '4' },
         { label: 'Maestria', value: '5' },
         { label: 'Doctorado', value: '6' }
      ];

      let studyAreaList = [
         { label: 'Seleccione', value: null },
         { label: 'Psicología', value: '1' },
         { label: 'Oncología', value: '2' },
         { label: 'Odontología', value: '3' },
         { label: 'Pediatría', value: '4' },
         { label: 'Psiquiatría', value: '5' },
         { label: 'Geología', value: '6' }
      ];

      let studyStateList = [
         { label: 'Seleccione', value: null },
         { label: 'En curso', value: '1' },
         { label: 'Terminado', value: '2' }
      ];

      let studyTypeList = [
         { label: 'Seleccione', value: null },
         { label: 'Diplomado', value: '1' },
         { label: 'Taller', value: '2' },
         { label: 'Curso de barrio', value: '3' },
         { label: 'Curso SENA', value: '4' },
         { label: 'Certificacion', value: '5' }
      ];

      let studyIntensityList = [
         { label: 'Seleccione', value: null },
         { label: '10 horas', value: '1' },
         { label: '20 horas', value: '2' },
         { label: '30 horas', value: '3' },
         { label: '40 horas', value: '4' },
         { label: '50 horas', value: '5' }
      ];

      let cities: any[] = [ { 'value': 101, 'label': 'Floridablanca - Santander - Colombia' },
         { 'value': 102, 'label': 'Floridablanca - Vichada - Colombia' },
         { 'value': 103, 'label': 'Floridablanca - Cesar - Colombia' },
         { 'value': 104, 'label': 'Bucaramanga - Santander - Colombia' },
         { 'value': 105, 'label': 'Bogota - Cundinamarca - Colombia' },
         { 'value': 106, 'label': 'Cartagena - Bolivar - Colombia' },
      ];

      let institutes: any[] = [ { 'value': 101, 'label': 'Bogota Universidad Nacional' },
         { 'value': 102, 'label': 'Bucaramanga Universidad Nacional' },
         { 'value': 103, 'label': 'Medellin Universidad Nacional' },
         { 'value': 104, 'label': 'Cali Universidad Nacional' },
         { 'value': 105, 'label': 'Pasto Universidad Nacional' },
         { 'value': 106, 'label': 'Barranquilla Universidad Nacional' }
      ];

      let documentTypes: any[] = [
         { 'value': null, 'label': 'Seleccione' },
         { 'value': '1', 'label': 'Cédula de Ciudadania' },
         { 'value': '2', 'label': 'Cédula de Extrangeria' },
         { 'value': '3', 'label': 'Tarjeta de identidad' },
      ];

      let relationship: any[] = [
         { 'value': null, 'label': 'Seleccione' },
         { 'value': '1', 'label': 'Padre' },
         { 'value': '2', 'label': 'Madre' },
         { 'value': '3', 'label': 'Hermano' },
         { 'value': '4', 'label': 'Primo' },
         { 'value': '5', 'label': 'Amigo' },
         { 'value': '6', 'label': 'abuelo' },
      ];

      let referencesTypeList: any[] = [
         { label: 'Seleccione', value: null },
         { label: 'Laboral', value: '1' },
         { label: 'Familiar', value: '2' }
      ];
      let companySectorList: any[] = [
         { 'value': null, 'label': 'Seleccione...' },
         { 'value': '1', 'label': 'Sector A' },
         { 'value': '2', 'label': 'Sector B' },
         { 'value': '3', 'label': 'Sector C' },
         { 'value': '4', 'label': 'Sector D' },
         { 'value': '5', 'label': 'Sector E' },
         { 'value': '6', 'label': 'Sector F' },
      ];

      let companySubSectorList: any[] = [
         { 'value': null, 'label': 'Seleccione...' },
         { 'value': '1', 'label': 'Sub Sector A' },
         { 'value': '2', 'label': 'Sub Sector B' },
         { 'value': '3', 'label': 'Sub Sector C' },
         { 'value': '4', 'label': 'Sub Sector D' },
         { 'value': '5', 'label': 'Sub Sector E' },
         { 'value': '6', 'label': 'Sub Sector F' },
      ];

      //  configure fake backend
      backend.connections.subscribe( ( connection: MockConnection ) => {
         //  wrap in timeout to simulate server api call
         setTimeout( () => {

            /*================ Colaboradores ================*/
            //  obtiene todos los Colaboradores
            if ( connection.request.url.endsWith( '/api/employees' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: employees }
               } ) ) );

            }

            //  obtiene un colaborador por el id
            if ( connection.request.url.match( /\/api\/employees\/\d+$/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               let matchedUsers = employees.filter( employee => {
                  return employee.idColaborador === id;
               } );
               let employee = matchedUsers.length ? matchedUsers[ 0 ] : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: employee } } ) ) );

               return;

            }

            //  crea un colaborador en el local
            if ( connection.request.url.endsWith( '/api/employees' ) && connection.request.method === RequestMethod.Post ) {
               //  get new user object from post body
               let newColaborador = JSON.parse( connection.request.getBody() );

               //  save new user
               newColaborador.idColaborador = employees.length + 1;
               employees.push( newColaborador );
               localStorage.setItem( 'employees', JSON.stringify( employees ) );

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  actualizar un colaborador
            if ( connection.request.url.match( /\/api\/employees\/\d+$/ ) && connection.request.method === RequestMethod.Put ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let updColaborador = JSON.parse( connection.request.getBody() );
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               for ( let i = 0; i < employees.length; i++ ) {
                  let col = employees[ i ];
                  if ( col.idColaborador === id ) {
                     //  delete user
                     employees[ i ] = updColaborador;
                     localStorage.setItem( 'employees', JSON.stringify( employees ) );
                     break;
                  }
               }

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  elimina un colaborador del localstorage
            if ( connection.request.url.match( /\/api\/employees\/\d+$/ ) && connection.request.method === RequestMethod.Delete ) {

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );

               for ( let i = 0; i < employees.length; i++ ) {
                  let col = employees[ i ];
                  if ( col.idColaborador === id ) {
                     //  delete user
                     employees.splice( i, 1 );
                     localStorage.setItem( 'employees', JSON.stringify( employees ) );
                     break;
                  }
               }
               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );
            }

            /*================ Ubicaciones ================*/

            //  obtiene el listado de Ubicaciones
            if ( connection.request.url.endsWith( '/api/employees-location' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: locations }
               } ) ) );

            }

            //  obtiene un Ubicacion por el id
            if ( connection.request.url.match( /\/api\/employees-location\/\d+$/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               let matched = locations.filter( location => {
                  return location.idUbicacion === id;
               } );
               let location = matched.length ? matched[ 0 ] : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: location } } ) ) );

               return;

            }

            //  crea un Ubicacion en el local
            if ( connection.request.url.endsWith( '/api/employees-location' ) && connection.request.method === RequestMethod.Post ) {
               //  get new user object from post body
               let newlocation = JSON.parse( connection.request.getBody() );

               //  save new user
               newlocation.idUbicacion = locations.length + 1;

               let matchedAddressType = addressTypeList.filter( rel => {
                  return rel.value === newlocation.tipoDireccion.value;
               } );

               newlocation.tipoDireccion = matchedAddressType.length ? matchedAddressType[ 0 ] : null;
               newlocation[ 'departamento' ] = { 'value': 4, 'label': 'Santander' };
               newlocation[ 'pais' ] = { 'value': 1, 'label': 'Colombia' };

               locations.push( newlocation );
               localStorage.setItem( 'locations', JSON.stringify( locations ) );

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  actualizar un Ubicacion
            if ( connection.request.url.match( /\/api\/employees-location\/\d+$/ ) && connection.request.method === RequestMethod.Put ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let newlocation = JSON.parse( connection.request.getBody() );

               let matchedAddressType = addressTypeList.filter( rel => {
                  return rel.value === newlocation.tipoDireccion.value;
               } );

               newlocation.tipoDireccion = matchedAddressType.length ? matchedAddressType[ 0 ] : null;
               newlocation[ 'departamento' ] = { 'value': 4, 'label': 'Santander' };
               newlocation[ 'pais' ] = { 'value': 1, 'label': 'Colombia' };

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               for ( let i = 0; i < locations.length; i++ ) {
                  let col = locations[ i ];
                  if ( col.idUbicacion === id ) {
                     //  delete user
                     locations[ i ] = newlocation;
                     localStorage.setItem( 'locations', JSON.stringify( locations ) );
                     break;
                  }
               }

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  elimina un Ubicacion del localstorage
            if ( connection.request.url.match( /\/api\/employees-location\/\d+$/ ) && connection.request.method === RequestMethod.Delete ) {

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );

               for ( let i = 0; i < locations.length; i++ ) {
                  let col = locations[ i ];
                  if ( col.idUbicacion === id ) {
                     //  delete user
                     locations.splice( i, 1 );
                     localStorage.setItem( 'locations', JSON.stringify( locations ) );
                     break;
                  }
               }
               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );
            }

            //  obtiene un listado de ciudades filtrado por el query
            if ( connection.request.url.match( /\/api\/cities\/s\/\w+/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let qr = urlParts[ urlParts.length - 1 ];
               let matched = cities.filter( cities => {
                  // return cities.value.match(/^qr.*$/);
                  if ( cities.label.match( /[qr]+/ ) ) {
                     return cities;
                  }
               } );
               matched = matched.length ? matched : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: matched } } ) ) );

               return;

            }

            // Listado de nomenclaturas principales
            if ( connection.request.url.endsWith( '/api/principal-nomenclature' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: principalNomenclatureList }
               } ) ) );

            }

            // Listado de tipos de nomenclaturas complementarias
            if ( connection.request.url.endsWith( '/api/complementary-nomenclature' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: complementaryNomenclatureList }
               } ) ) );

            }

            // Listado de tipos de direcciones
            if ( connection.request.url.endsWith( '/api/address-types' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: addressTypeList }
               } ) ) );

            }

            /*================ Familiares ================*/

            //  obtiene el listado de familiares
            if ( connection.request.url.endsWith(
                  '/api/employees-family-information' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: familys }
               } ) ) );

            }

            //  obtiene un familiar por el id
            if ( connection.request.url.match(
                  /\/api\/employees-family-information\/\d+$/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               let matched = familys.filter( family => {
                  return family.idFamiliar === id;
               } );
               let family = matched.length ? matched[ 0 ] : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: family } } ) ) );

               return;

            }

            //  crea un familiar en el local
            if ( connection.request.url.endsWith(
                  '/api/employees-family-information' ) && connection.request.method === RequestMethod.Post ) {
               //  get new user object from post body
               let newFamily = JSON.parse( connection.request.getBody() );

               //  save new user
               newFamily.idFamiliar = familys.length + 1;
               let matchedTypes = documentTypes.filter( types => {
                  return types.value === newFamily.tipoDeDocumento;
               } );
               let matchedRelationship = relationship.filter( rel => {
                  return rel.value === newFamily.parentesco;
               } );

               newFamily.tipoDeDocumento = matchedTypes.length ? matchedTypes[ 0 ] : null;
               newFamily.parentesco = matchedRelationship.length ? matchedRelationship[ 0 ] : null;

               familys.push( newFamily );
               localStorage.setItem( 'familys', JSON.stringify( familys ) );

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  actualizar un familiar
            if ( connection.request.url.match(
                  /\/api\/employees-family-information\/\d+$/ ) && connection.request.method === RequestMethod.Put ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let newFamily = JSON.parse( connection.request.getBody() );

               let matchedTypes = documentTypes.filter( types => {
                  return types.value === newFamily.tipoDeDocumento;
               } );
               let matchedRelationship = relationship.filter( rel => {
                  return rel.value === newFamily.parentesco;
               } );

               newFamily.tipoDeDocumento = matchedTypes.length ? matchedTypes[ 0 ] : null;
               newFamily.parentesco = matchedRelationship.length ? matchedRelationship[ 0 ] : null;

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               for ( let i = 0; i < familys.length; i++ ) {
                  let col = familys[ i ];
                  if ( col.idFamiliar === id ) {
                     //  delete user
                     familys[ i ] = newFamily;
                     localStorage.setItem( 'familys', JSON.stringify( familys ) );
                     break;
                  }
               }

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  elimina un familiar del localstorage
            if ( connection.request.url.match(
                  /\/api\/employees-family-information\/\d+$/ ) && connection.request.method === RequestMethod.Delete ) {

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );

               for ( let i = 0; i < familys.length; i++ ) {
                  let col = familys[ i ];
                  if ( col.idFamiliar === id ) {
                     //  delete user
                     familys.splice( i, 1 );
                     localStorage.setItem( 'familys', JSON.stringify( familys ) );
                     break;
                  }
               }
               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );
            }
// Referencias

            //  obtiene el referencias
            if ( connection.request.url.endsWith( '/api/references' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: references }
               } ) ) );

            }

            //  obtiene una referencia por el id
            if ( connection.request.url.match( /\/api\/references\/\d+$/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               let matched = references.filter( reference => {
                  return reference.idReferencia === id;
               } );
               let reference = matched.length ? matched[ 0 ] : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: reference } } ) ) );

               return;

            }

            //  crea una referencia en el localstorage
            if ( connection.request.url.endsWith( '/api/references' ) && connection.request.method === RequestMethod.Post ) {
               //  get new user object from post body
               let newReference = JSON.parse( connection.request.getBody() );

               let matchedreferencesType = referencesTypeList.filter( rel => {
                  return rel.value === newReference.tipodeReferencia.value;
               } );

               newReference.tipodeReferencia = matchedreferencesType.length ? matchedreferencesType[ 0 ] : null;

               //  save new user
               newReference.idReferencia = references.length + 1;
               references.push( newReference );
               localStorage.setItem( 'references', JSON.stringify( references ) );

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  actualizar una referencia
            if ( connection.request.url.match( /\/api\/references\/\d+$/ ) && connection.request.method === RequestMethod.Put ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let newReference = JSON.parse( connection.request.getBody() );
               let matchedreferencesType = referencesTypeList.filter( rel => {
                  return rel.value === newReference.tipodeReferencia.value;
               } );
               newReference.tipodeReferencia = matchedreferencesType.length ? matchedreferencesType[ 0 ] : null;

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               for ( let i = 0; i < references.length; i++ ) {
                  let col = references[ i ];
                  if ( col.idReferencia === id ) {
                     //  delete user
                     references[ i ] = newReference;
                     localStorage.setItem( 'references', JSON.stringify( references ) );
                     break;
                  }
               }

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  elimina una referencias del localstorage
            if ( connection.request.url.match( /\/api\/references\/\d+$/ ) && connection.request.method === RequestMethod.Delete ) {

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );

               for ( let i = 0; i < references.length; i++ ) {
                  let col = references[ i ];
                  if ( col.idReferencia === id ) {
                     //  delete user
                     references.splice( i, 1 );
                     localStorage.setItem( 'references', JSON.stringify( references ) );
                     break;
                  }
               }
               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );
            }

// Estudios formales

            // Listado de tipos de nivel de estudios
            if ( connection.request.url.endsWith( '/api/study-level' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: studyLevelList }
               } ) ) );

            }

            // Listado de tipos de areas de estudio
            if ( connection.request.url.endsWith( '/api/study-area' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: studyAreaList }
               } ) ) );

            }

            // Listado de estados de estudio
            if ( connection.request.url.endsWith( '/api/study-state' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: studyStateList }
               } ) ) );

            }

            // Listado de estados de estudio
            if ( connection.request.url.endsWith( '/api/study-type' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: studyTypeList }
               } ) ) );

            }

            // Listado de estados de estudio
            if ( connection.request.url.endsWith( '/api/study-intensity' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: studyIntensityList }
               } ) ) );

            }

            //  obtiene un listado de instituciones filtrado por el query
            if ( connection.request.url.match( /\/api\/institute\/s\/\w+/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let qr = urlParts[ urlParts.length - 1 ];
               let matched = institutes.filter( institude => {
                  if ( institude.label.match( /[qr]+/ ) ) {
                     return institude;
                  }
               } );
               matched = matched.length ? matched : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: matched } } ) ) );

               return;

            }

            //  obtiene todos
            if ( connection.request.url.endsWith( '/api/formalstudies' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: fstudies }
               } ) ) );

            }

            //  obtiene una  por el id
            if ( connection.request.url.match( /\/api\/formalstudies\/\d+$/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               let matched = fstudies.filter( fstudy => {
                  return fstudy.idEstudio === id;
               } );
               let study = matched.length ? matched[ 0 ] : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: study } } ) ) );

               return;

            }

            //  crea una  en el localstorage
            if ( connection.request.url.endsWith( '/api/formalstudies' ) && connection.request.method === RequestMethod.Post ) {
               //  get new user object from post body
               let news = JSON.parse( connection.request.getBody() );

               //  save new formal study
               news.idEstudio = fstudies.length + 1;
               news.ciudad = cities.find( c => c.value === news.ciudad.value );
               news.estadoEstudio = studyStateList.find( s => s.value === news.estadoEstudio.value );
               news.areaEstudio = studyAreaList.find( s => s.value === news.areaEstudio.value );
               news.nivelEstudio = studyLevelList.find( s => s.value === news.nivelEstudio.value );

               fstudies.push( news );
               localStorage.setItem( 'fstudies', JSON.stringify( fstudies ) );

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  actualizar una
            if ( connection.request.url.match( /\/api\/formalstudies\/\d+$/ ) && connection.request.method === RequestMethod.Put ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let news = JSON.parse( connection.request.getBody() );
               news.nombreCompleto = news.primerNombre + ' ' + news.segundoNombre + ' ' + news.primerApellido + ' ' + news.segundoApellido;
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               for ( let i = 0; i < fstudies.length; i++ ) {
                  let col = fstudies[ i ];
                  if ( col.idEstudio === id ) {
                     //  delete user
                     fstudies[ i ] = news;
                     localStorage.setItem( 'references', JSON.stringify( fstudies ) );
                     break;
                  }
               }

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  elimina una  del localstorage
            if ( connection.request.url.match( /\/api\/formalstudies\/\d+$/ ) && connection.request.method === RequestMethod.Delete ) {

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );

               for ( let i = 0; i < fstudies.length; i++ ) {
                  let col = fstudies[ i ];
                  if ( col.idEstudio === id ) {
                     //  delete user
                     fstudies.splice( i, 1 );
                     localStorage.setItem( 'references', JSON.stringify( fstudies ) );
                     break;
                  }
               }
               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );
            }

// Estudios no formales

            //  obtiene todos
            if ( connection.request.url.endsWith( '/api/noformalstudies' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: nfstudies }
               } ) ) );

            }

            //  obtiene una  por el id
            if ( connection.request.url.match( /\/api\/noformalstudies\/\d+$/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               let matched = nfstudies.filter( fstudy => {
                  return fstudy.idEstudio === id;
               } );
               let study = matched.length ? matched[ 0 ] : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: study } } ) ) );

               return;

            }

            //  crea una  en el localstorage
            if ( connection.request.url.endsWith( '/api/noformalstudies' ) && connection.request.method === RequestMethod.Post ) {
               //  get new user object from post body
               let news = JSON.parse( connection.request.getBody() );

               //  save new user
               news.idEstudio = nfstudies.length + 1;
               news.ciudad = cities.find( c => c.value === news.ciudad.value );
               news.estadoEstudio = studyStateList.find( s => s.value === news.estadoEstudio.value );
               news.areaEstudio = studyAreaList.find( s => s.value === news.areaEstudio.value );
               news.tipoEstudio = studyTypeList.find( s => s.value === news.tipoEstudio.value );
               news.intensidad = studyIntensityList.find( s => s.value === news.intensidad.value );

               nfstudies.push( news );
               localStorage.setItem( 'references', JSON.stringify( nfstudies ) );

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  actualizar una
            if ( connection.request.url.match( /\/api\/noformalstudies\/\d+$/ ) && connection.request.method === RequestMethod.Put ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let news = JSON.parse( connection.request.getBody() );
               news.nombreCompleto = news.primerNombre + ' ' + news.segundoNombre + ' ' + news.primerApellido + ' ' + news.segundoApellido;
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               for ( let i = 0; i < nfstudies.length; i++ ) {
                  let col = nfstudies[ i ];
                  if ( col.idEstudio === id ) {
                     //  delete user
                     nfstudies[ i ] = news;
                     localStorage.setItem( 'references', JSON.stringify( nfstudies ) );
                     break;
                  }
               }

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  elimina una  del localstorage
            if ( connection.request.url.match( /\/api\/noformalstudies\/\d+$/ ) && connection.request.method === RequestMethod.Delete ) {

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );

               for ( let i = 0; i < nfstudies.length; i++ ) {
                  let col = nfstudies[ i ];
                  if ( col.idEstudio === id ) {
                     //  delete user
                     nfstudies.splice( i, 1 );
                     localStorage.setItem( 'references', JSON.stringify( nfstudies ) );
                     break;
                  }
               }
               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );
            }

            // Experiencia laboral

            //  obtiene todos
            if ( connection.request.url.endsWith( '/api/workexperience' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: experiences }
               } ) ) );

            }

            //  obtiene una  por el id
            if ( connection.request.url.match( /\/api\/workexperience\/\d+$/ ) && connection.request.method === RequestMethod.Get ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               let matched = experiences.filter( experience => {
                  return experience.idExperiencia === id;
               } );
               let experience = matched.length ? matched[ 0 ] : null;

               //  respond 200 OK with user
               connection.mockRespond( new Response( new ResponseOptions( { status: 200, body: { data: experience } } ) ) );

               return;

            }

            //  crea una  en el localstorage
            if ( connection.request.url.endsWith( '/api/workexperience' ) && connection.request.method === RequestMethod.Post ) {
               //  get new user object from post body
               let news = JSON.parse( connection.request.getBody() );

               //  save new user
               news.idEstudio = nfstudies.length + 1;
               // news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
               experiences.push( news );
               localStorage.setItem( 'experiences', JSON.stringify( experiences ) );

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  actualizar una
            if ( connection.request.url.match( /\/api\/workexperience\/\d+$/ ) && connection.request.method === RequestMethod.Put ) {
               //  check for fake auth token in header and return user if valid, this security is implemented server side in a real
               //  application find user by id in users array
               let news = JSON.parse( connection.request.getBody() );
               // news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );
               for ( let i = 0; i < experiences.length; i++ ) {
                  let col = experiences[ i ];
                  if ( col.idExperiencia === id ) {
                     //  delete user
                     experiences[ i ] = news;
                     localStorage.setItem( 'experiences', JSON.stringify( experiences ) );
                     break;
                  }
               }

               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );

               return;
            }

            //  elimina una  del localstorage
            if ( connection.request.url.match( /\/api\/workexperience\/\d+$/ ) && connection.request.method === RequestMethod.Delete ) {

               let urlParts = connection.request.url.split( '/' );
               let id = parseInt( urlParts[ urlParts.length - 1 ] );

               for ( let i = 0; i < experiences.length; i++ ) {
                  let col = experiences[ i ];
                  if ( col.idEstudio === id ) {
                     //  delete user
                     experiences.splice( i, 1 );
                     localStorage.setItem( 'experiences', JSON.stringify( experiences ) );
                     break;
                  }
               }
               //  respond 200 OK
               connection.mockRespond( new Response( new ResponseOptions( { status: 200 } ) ) );
            }

// Tipos documentos

            //  obtiene todos
            if ( connection.request.url.endsWith( '/api/document-types' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: documentTypes }
               } ) ) );

            }

            // Parenetesco

            //  obtiene todos
            if ( connection.request.url.endsWith( '/api/relationship' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: {
                     data: relationship
                  }
               } ) ) );

            }
//  Tipos referencias
            //  obtiene todos
            if ( connection.request.url.endsWith( '/api/references-types' ) && connection.request.method === RequestMethod.Get ) {

               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: { data: referencesTypeList }
               } ) ) );

            }

            //  companySectorList
            if ( connection.request.url.endsWith( '/api/companyselector' ) && connection.request.method === RequestMethod.Get ) {
               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: {
                     data: companySectorList
                  }
               } ) ) );
            }

            // companySubSectorList
            if ( connection.request.url.endsWith( '/api/companysubselector' ) && connection.request.method === RequestMethod.Get ) {
               connection.mockRespond( new Response( new ResponseOptions( {
                  status: 200,
                  body: {
                     data: companySubSectorList
                  }
               } ) ) );
            }

         }, 500 );

      } );

      return new Http( backend, options );
   },
   deps: [ MockBackend, BaseRequestOptions ]
};
