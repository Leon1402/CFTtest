import React from 'react';
import {makeAutoObservable, runInAction} from 'mobx';
import {TOKEN} from '../constants/constants';

export class MyState {
  users = [];
  constructor() {
    makeAutoObservable(this);
    this.getUsers(); // При первом запуске сразу запрашиваем пользователей с сервера
  }

  //Функция получения пользователей с сервера
  getUsers = async () => {
    const url = 'https://gorest.co.in/public/v1/users';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const json = await response.json();
    runInAction(() => {
      this.users = json.data;
    });
  };

  //Проверка использовался ли текущий email у других пользователей
  checkEmail = email => {
    for (let elem of this.users) {
      if (elem.email === email) {
        console.log('есть');
        return true;
      }
    }
    return false;
  };

  // Добавление нового пользователя
  addUser = async user => {
    const url = 'https://gorest.co.in/public/v1/users';

    const data = {
      name: user.name,
      gender: user.gender,
      email: user.email,
      status: 'active',
    };

    const response = await fetch(url, {
      method: 'POST', //
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    //После добавления пльзователя, запрашиваем новый список с сервера
    this.getUsers();
  };
}
