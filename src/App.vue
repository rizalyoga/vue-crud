<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;
}
body {
  background-color: #4997f6;
  color: #fff;
}
a {
  color: #2aeb74;
  text-decoration: none;
}

button {
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;

  background-color: #3bf683;
  font-size: 1.125rem;
  color: #030e1b;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: 0.3s;
}

button:hover {
  background-color: #6bf8a1;
}
</style>
