import styleAuthForm from "./auth-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function AuthForm(props) {
  return (
    <section className={styleAuthForm.container}>
      <form className={styleAuthForm.form} onSubmit={props.submit}>
        <h2 className="text text_type_main-medium mb-6">{props.title}</h2>
        {props.children}
        <Button type="primary" size="medium">
          {props.buttonName}
        </Button>
      </form>
      <p
        className={`${styleAuthForm.footer} text text_type_main-default text_color_inactive`}
      >
        {props.footerQuestion}{" "}
        <Link className={styleAuthForm.footerLink} to={props.link}>
          {props.footerLink}
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {" "}
        {props.footerMoreQuestion}
        <Link className={styleAuthForm.footerLink} to={props.moreLink}>
          {props.footerMoreLink}
        </Link>
      </p>
    </section>
  );
}

export default AuthForm;