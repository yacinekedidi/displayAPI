import { connect } from 'getstream';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {StreamChat} from 'stream-chat';


const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

class AuthController {
  static async signup(req, res) {
    try {
      const { username, password, fullName, phoneNumber: phone_number, avatarURL } = req.body;
      const serverClient = connect(api_key, api_secret, app_id);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        username,
        hashedPassword,
        fullName,
        phone_number,
        avatarURL,
      }
      const newUser = new User(user);
      console.log(newUser);
      console.log('----------------');
      const token = serverClient.createUserToken(newUser._id);
      newUser.token = token;
      console.log(newUser);
      console.log('----------------');
      const savedUser = await newUser.save();
      console.log(savedUser);
      console.log('----------------');
      return res.status(201).json({...user, userId: savedUser._id, token} );
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const serverClient = connect(api_key, api_secret, app_id);
      const client = StreamChat.getInstance(api_key, api_secret);

      const { users } = await client.queryUsers({ name: username });

      // const updateResponse = await client.upsertUser({
      //   id: users[0].id,
      //   role: 'admin',
      // });
      // console.log(updateResponse);

      if (!users.length)
        return res.status(400).json({ message: 'User not found' });
      const success = await bcrypt.compare(password, users[0].hashedPassword);
      const token = serverClient.createUserToken(users[0].id);

      // console.log(users);
      if (success) {
        res.status(200).json({
          token,
          role: users[0].role,
          fullName: users[0].fullName,
          username,
          userId: users[0].id,
        });
      } else {
        res.status(500).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      // ads;
      // console.log(error);

      res.status(500).json({ message: error });
    }
  }
}

export {AuthController};
