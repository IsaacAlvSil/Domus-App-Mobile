export default class Payment {
  constructor(id, month, amount, status, datePaid) {
    this.id = id;
    this.month = month;
    this.amount = amount;
    this.status = status; // 'Pagado', 'Pendiente'
    this.datePaid = datePaid;
  }
}