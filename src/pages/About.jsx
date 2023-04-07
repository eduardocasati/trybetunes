import React, { Component } from "react";
import { BsArrowUpRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { DiCss3, DiHtml5, DiJavascript1, DiReact } from "react-icons/di";

import "../style/About.css";

import Header from "../components/Header";

export default class About extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="about__container">
          <h2>
            Aplicação criada por <span className="accent">Eduardo Casati</span>
          </h2>
          <p className="web-development">
            como parte da Formação em Desenvolvimento Web pela{" "}
            <a
              href="https://www.betrybe.com/formacao-desenvolvimento-web"
              target="_blank"
            >
              Trybe
            </a>
          </p>
          <div className="social-icons">
            <a href="https://github.com/eduardocasati" target="_blank">
              <BsGithub className="github-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/eduardo-casati/"
              target="_blank"
            >
              <BsLinkedin className="linkedin-icon" />
            </a>
          </div>
          <div className="technologies">
            <span>
              Tecnologias usadas:
              <div className="technologies-icons">
                <DiHtml5 />
                <DiCss3 />
                <DiJavascript1 />
                <DiReact />
              </div>
            </span>
          </div>
          <a href="https://github.com/eduardocasati/trybetunes" target="_blank">
            <span className="repository">
              Repositório do projeto <BsArrowUpRight />
            </span>
          </a>
        </div>
      </>
    );
  }
}
