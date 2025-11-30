export default class Notice {
  constructor(id, title, date, priority, category, content, summary) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.priority = priority; // e.g., 'Urgente', 'Evento'
    this.category = category;
    this.content = content;
    this.summary = summary;
  }
}