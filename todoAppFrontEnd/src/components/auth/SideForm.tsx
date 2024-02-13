import classes from "./sideForm.module.css";
function SideForm() {
  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.formContainer}`}>
        <p>Time to work!</p>
        <input />
        <input type="text" />
        <button />
      </div>
    </div>
  );
}

export default SideForm;
