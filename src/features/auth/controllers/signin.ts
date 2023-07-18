import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { loginSchema } from '@auth/schemes/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { userService } from '@service/db/user.service';
import { IUserDocument } from '@user/interfaces/user.interface';
// import { forgotPasswordTemplate } from '@service/emails/templates/forgot-password/forgot-password-template';
// import { emailQueue } from '@service/queues/email.queue';

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IAuthDocument = await authService.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const user: IUserDocument = await userService.getUserByAuthId(`${existingUser._id}`);
    const userJwt: string = JWT.sign(
      {
        userId: user._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor
      },
      config.JWT_TOKEN!
    );

    const userDocument: IUserDocument = {
      ...user,
      authId: existingUser!._id,
      username: existingUser!.username,
      email: existingUser!.email,
      avatarColor: existingUser!.avatarColor,
      uId: existingUser!.uId,
      createdAt: existingUser!.createdAt
    } as IUserDocument;

    // const resetLink = `${config.CLIENT_URL}/reset-password?token=12374838282839497`;
    // const template:string = forgotPasswordTemplate.passwordResetTemplate(existingUser.username!,resetLink);
    // emailQueue.addEmailJob('forgotPasswordEmail',{template,receiverEmail:'alexa.will@ethereal.email',subject:'Reset your password'});
    req.session = { jwt: userJwt };
    res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: userDocument, token: userJwt });
  }
}
