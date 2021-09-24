import React from "react";

export default function About(): JSX.Element {
  return (
    <>
      <br />
      <h3>Приложение для учета расходов</h3>
      <br />
      <section>
        <h6>Для работы в приложении, необходима авторизация.</h6>
        <br />
        <p>
          На странице "Категории" можно заводить категории, и у каждой могут
          быть подкатегории (вложенность категорий ограничена да 2).
        </p>
        <p>
          В каждую категорию или подкатегорию на определенную дату можно вносить
          сумму которую потратили или получили.
        </p>
        <p>Расходы вносятся на странице "Расходы/Зачисления".</p>
        <p>
          Если в подкатегории есть расходы, то они будут учитываться и в
          категории.
        </p>
        <p>Статистику можно посмотреть на главной странице.</p>
      </section>
    </>
  );
}
