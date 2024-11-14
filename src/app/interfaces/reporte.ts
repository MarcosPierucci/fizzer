export interface Reporte {
  id: string,
  motivo: string,
  reportado:string,
  link: string,
  tipoReporte: string
  idReportado: string|number
  idPublicacionReportada?: string
  reporteTerminado:boolean
  }
