import express from 'express';
import passport from 'passport';
const router = express.Router();

router
  .get('insta/instagram', passport.authenticate('instagram'))
  .get('insta/instagram/callback', passport.authenticate('instagram', {
    successRedirect: '/users',
    failure: '/error'
  }))

export default router;
