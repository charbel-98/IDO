import classes from "./task.module.css";

function Task() {
  return (
    <div className={`${classes.taskContainer}`}>
      <div className={`${classes.title}`}>Prepare the assay</div>
      <div className={`${classes.taskPropsContainer}`}>
        <div className={`${classes.propKey}`}>Category</div>
        <div className={`${classes.propValue}`}>Education</div>
        <div className={`${classes.propKey}`}>Due Date</div>
        <div className={`${classes.propValue}`}>12/12/2022</div>
        <div className={`${classes.propKey}`}>Estimate</div>
        <div className={`${classes.propValue}`}>6 hours</div>
        <div className={`${classes.propKey}`}>Importance</div>
        <div className={`${classes.propValueBox} ${classes.boxWarning} `}>
          Medium
        </div>
      </div>
    </div>
  );
}

export default Task;
