import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* RESET CSS */

  :root {
    --input-color: #7dbbc3;
    --button-color: #f4b9b2;
    --info-color: #daedbd;
    --comment-highlight-color: #de6b48;
    --danger-color: #de6b48;
  }

  html,
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    color: #2d3436;
  }

  html,
  body,
  input {
    font: menu;
  }

  input,
  button {
    display: block;
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    &:focus {
      outline: none;
    }
  }

  input[type='text'],
  input[type='email'],
  input[type='password'] {
    border: none;
    border-bottom: 1px solid var(--input-color);
    font-size: 1.5em;
    padding: 0.5em;
  }

  button,
  input[type='submit'],
  .button {
    display: block;
    width: 100%;
    font-size: 1.1em;
    padding: 0.5em;

    ${"" /* @include button(var(--button-color)); */}

    background-color: var(--button-color);
    ${"" /* border: 1px solid darken($color, 10); */}
    border: 1px solid var(--danger-color);
    &:hover {
      ${"" /* background-color: lighten($color, 10); */}
      background-color: var(--button-color);
    }
    &:active {
      ${"" /* background-color: lighten($color, 20); */}
      background-color: var(--button-color);
    }


    &.star, &.create, &.update {
      ${"" /* @include button(var(--input-color)); */}

      background-color: var(--input-color);
      ${"" /* border: 1px solid darken($color, 10); */}
      border: 1px solid var(--input-color);
      &:hover {
        ${"" /* background-color: lighten($color, 10); */}
        background-color: var(--input-color);
      }
      &:active {
        ${"" /* background-color: lighten($color, 20); */}
        background-color: var(--input-color);
      }
    }


    &.delete {
      ${"" /* @include button(var(--danger-color)); */}

      background-color: var(--danger-color);
      ${"" /* border: 1px solid darken($color, 10); */}
      border: 1px solid var(--danger-color);
      &:hover {
        ${"" /* background-color: lighten($color, 10); */}
        background-color: var(--danger-color);
      }
      &:active {
        ${"" /* background-color: lighten($color, 20); */}
        background-color: var(--danger-color);
      }
    }
  }

  input[type="file"] {
    margin: 1em 0;
    padding: 1em 0;
  }

  .Application {
    max-width: 600px;
    margin: auto;
  }

  .SignIn {
    border: 1px solid var(--input-color);
    padding: 1em;
    margin-bottom: 1em;
    h2 {
      margin: 0.5em 0.5em;
      padding: 0.5em;
      border-left: 5px solid var(--info-color);
    }
  }

  .SignUp {
    border: 1px solid var(--input-color);
    padding: 1em;
    margin-bottom: 1em;
    h2 {
      margin: 0.5em 0.5em;
      padding: 0.5em;
      border-left: 5px solid var(--info-color);
    }
  }

  .CurrentUser {
    border: 1px solid var(--input-color);
    padding: 1em;
    margin-bottom: 1em;

    h2 {
      margin: 0.5em 0.5em;
      padding: 0.5em;
      border-left: 5px solid var(--info-color);
    }

    .CurrentUser--profile {
      display: flex;
      margin-bottom: 0.5em;
    }

    .CurrentUser--information {
      flex: 4;
    }

    img {
      flex: 1;
      margin-right: 1em;
      max-height: 150px;
    }

    h2 {
      margin-bottom: 1em;
    }

    .created-at:before {
      content: 'Joined';
      color: var(--comment-highlight-color);
      font-weight: bold;
      margin: 0.5em 0.5em;
    }

    .email:before {
      content: 'Email';
      color: var(--comment-highlight-color);
      font-weight: bold;
      margin: 0.5em 0.5em;
    }
  }

  .AddPost,
  .AddComment {
    margin-bottom: 1em;
  }

  .AddComment {
    display: flex;
    input {
      margin: 0;
      padding: 0.5em;
    }
    input[type="text"] {
      flex: 3;
    }
    input[type="submit"] {
      flex: 1;
    }
  }

  .Post {
    border: 1px solid var(--input-color);
    margin-bottom: 1em;
  }

  .Post--content {
    padding: 1em;

    h3 {
      margin-top: 0;
    }
  }

  .Post--meta {
    padding: 0.5em;
    background-color: var(--info-color);
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      display: inline-block;
      margin: 1em;
    }

    button {
      display: inline-block;
      width: auto;
      &:not(:last-child) {
        margin-right: 5px;
        margin-bottom: 0;
      }
    }
  }

  .Comment {
    margin: 1em 0;
  }

  .Comment--author {
    color: var(--comment-highlight-color);
    font-weight: bold;
    &:after {
      content: ': ';
    }
  }

  .Comment--timestamp {
    color: darken(var(--info-color), 40);
    &:before {
      content: ' ';
    }
  }
`;

export default GlobalStyles;
