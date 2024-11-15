import { Component, inject, OnInit } from '@angular/core';
import { BarraVerdeAdminComponent } from "../../admin/barra-verde-admin/barra-verde-admin.component";
import { BarraVerdeUsuarioComponent } from "../barra-verde-usuario/barra-verde-usuario.component";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { identifierName } from '@angular/compiler';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Reporte } from '../../interfaces/reporte';
import { ReporteService } from '../../service/reporte.service';

@Component({
  selector: 'app-formulario-reportes',
  standalone: true,
  imports: [BarraVerdeUsuarioComponent, ReactiveFormsModule],
  templateUrl: './formulario-reportes.component.html',
  styleUrl: './formulario-reportes.component.css'
})
export class FormularioReportesComponent implements OnInit{

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.formulario.patchValue({
        reportado: params['reportado'],
        link: params['link'],
        idReportado: params['idReportado'],
        idPublicacionReportada: params['idPublicacionReportada']
      });
    });
  }

fb= inject(FormBuilder);
rs = inject(ReporteService);
route = inject(ActivatedRoute);
router = inject(Router);

formulario = this.fb.nonNullable.group(
{
  id: [''],
  motivo:['', [Validators.required, Validators.minLength(5)]],
  reportado: [''],
  link:[''],
  idReportado: [''],
  idPublicacionReportada: [''],
  reporteTerminado: [false]
}
)



cargarReporte() {
  if (this.formulario.invalid) return alert("Formulario Invalido");

  const reporteFormulario : Reporte = this.formulario.getRawValue(); // Conserva esta variable para los datos del formulario

  //Aca agregar las funciones o lo que sea necesario para cargar el resto de los valores que por el momento estan vacios

  this.tamanioArregloReportes((id: number) => {
    console.log("ID calculado:", id);
    //Aca despues hay que cargarle a nuevoReporte el id, lo tenemos que hacer a lo ultimo porque sino por la promesa no lo llega a cargar
    reporteFormulario.id = id.toString()

    console.log("Formulario completo:", reporteFormulario);

    this.addReportedb(reporteFormulario)

  });



  //this.router.navigate(['/formulario-reportes']
this.router.navigate(['/home']);
}

tamanioArregloReportes(callback: (id: number) => void) {
  this.rs.getReportes().subscribe({
    next: (reporte: Reporte[]) => {
      const listaReportes = reporte;
      const id = listaReportes.length + 1; // Calcula el id como tamaño del arreglo + 1
      callback(id); // Llama al callback pasando el id calculado
    },
    error: () => {
      console.log("Error al traer el arreglo de reportes");
    }
  });
}

addReportedb(reporte : Reporte)
{
  this.rs.postReporte(reporte).subscribe({
    next:()=>{
      console.log("Reporte guardado correctamente")
    }, error:()=>{
      console.log("Erorr al cargar el reporte")
    }
  })
}

}
