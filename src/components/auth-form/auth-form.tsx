import styleAuthForm from "./auth-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import React, { FC } from 'react';

interface IAuthForm {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  children?: {};
  buttonName?: string;
  footerQuestion?: string;
  link?: string;
  footerLink?: string;
  footerMoreQuestion?: string;
  moreLink?: string;
  footerMoreLink?: string;
}

const AuthForm: FC<IAuthForm> = ({
  submit,
  title,
  children,
  buttonName,
  footerQuestion,
  link, footerLink,
  footerMoreQuestion,
  moreLink,
  footerMoreLink
}) => {
  return (
    <section className={styleAuthForm.container}>
      <form className={styleAuthForm.form} onSubmit={submit}> 
        <h2 className="text text_type_main-medium mb-6">{title}</h2>
        {children}
        <Button type="primary" size="medium">
          {buttonName}
        </Button>
      </form>
      <p
        className={`${styleAuthForm.footer} text text_type_main-default text_color_inactive`}
      >
        {footerQuestion}{" "}
        <Link className={styleAuthForm.footerLink} to={link!}>
          {footerLink}
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {" "}
        {footerMoreQuestion}
        <Link className={styleAuthForm.footerLink} to={moreLink!}>
          {footerMoreLink}
        </Link>
      </p>
    </section>
  );
}

export default AuthForm;
