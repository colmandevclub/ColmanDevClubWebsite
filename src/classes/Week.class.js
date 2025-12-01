class Week {
  constructor({
    title,
    programRef,
    subject,
    presantaion_links,
    youtube_links,
    project_link,
    exercise_link,
    other_links,
    is_visible,
    created_at,
    order_num,
  }) {
    this.title = title;
    this.programRef = programRef;
    this.subject = subject;
    this.presantaion_links = presantaion_links;
    this.youtube_links = youtube_links;
    this.project_link = project_link;
    this.exercise_link = exercise_link;
    this.other_links = other_links;
    this.is_visible = is_visible;
    this.created_at = created_at;
    this.order_num = order_num;

    this.validateWeek();
  }

  validateWeek() {}
}

export default Week;
