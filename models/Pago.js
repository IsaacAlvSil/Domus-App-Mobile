export default class Pago {
  constructor(id, monto, estado, fechaLimite, concepto, periodo) {
    this.id = id;
    this.monto = monto;
    this.estado = estado;
    this.fecha_limite = fechaLimite;
    this.concepto = concepto;
    this.periodo = periodo;
  }

  get estaPagado() {
    return this.monto === 0 || this.estado === 'Pagado';
  }
}