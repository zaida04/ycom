import Session from '@/db/Session';
import User, { IUser } from '@/db/User';
import { initTRPC } from '@trpc/server';
import { NextApiRequest, NextApiResponse } from 'next';

const t = initTRPC.context<{ user: IUser | null; req: NextApiRequest; res: NextApiResponse }>().create();

export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
    const { req, res } = opts.ctx;

    const token = req.cookies.token;
    if (token) {
        const session = await Session.findOne({ token });
        if (session) {
            const user = await User.findById(session.user_id);
            return opts.next({
                ctx: {
                    req, res, user
                }
            })
        }
    }

    return opts.next({
        ctx: {
            req, res, user: null
        }
    })
})
export const router = t.router;
export const procedure = t.procedure;