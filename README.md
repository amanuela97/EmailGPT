# EmailGPT

- EmailGPT allows you to generate unique messages in bulk. For instance,
  if you want to send the same email to multiple users but make it unqiue per user, then you can use this app to generate bulk messages.

- link to live version of EmailGPT - [EmailGPT](https://email-gpt-amanuela97.vercel.app/)

# How to use EmailGPT

- In order to dynamically replace the names of the users, make sure to write [name] inside your message. For instance, the following example below will replace every instance of [name] with the names of the users in the multi-input.

  <code>before the messages are generated</code>

  ```
  Dear [name]

  Hello [name], I am writing this message to express my interest in attending the party this weekend.

  Sincerely,
  Amanuel

  ```

  <code>after</code>

  ```
  Dear jake

  Hello jake, I am writing this message to express my interest in attending the party this weekend.

  Sincerely,
  Amanuel

  ```

- Since this app has a word limit, make sure the message you want to generate does not exceed the token limit of 150 using this link: [Tokenizer](https://platform.openai.com/tokenizer)
