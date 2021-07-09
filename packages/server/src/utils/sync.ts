import { RequestHandler } from "express";

const sync: RequestHandler = async (req /*, res */) => {
  console.log(req.session);
  //   let currentDevice = await Device.findOne({ where: { ip: req.ip } });
  //   let currentSession: void | Session | undefined;
  //   if (!currentDevice) {
  //     currentDevice = await Device.create({
  //       ip: req.ip,
  //       userAgent: req.headers["user-agent"],
  //     })
  //       .save()
  //       .then((device): Device => {
  //         console.log("New device added!");
  //         return device;
  //       });
  //   } else {
  //     currentSession = await Session.findOne({
  //       where: { deviceId: currentDevice.id },
  //     });
  //   }
  //   if (!currentSession && currentDevice) {
  //     currentSession = await Session.create({
  //       deviceId: currentDevice.id,
  //     })
  //       .save()
  //       .then((session): Session => {
  //         console.log("New session created!");
  //         return session;
  //       });
  //   }
  //   if (currentSession) {
  //     const accessToken = jwt.sign(
  //       currentSession,
  //       "b7f9408a3778cb3620a8680e0ed64367880a029a00dbbcb96fc24bc259b34b77ac3b2546b0241a79caf58d348d0371eb6fc6381ac3288cc8f5a5772a37b10f4e"
  //     );
  //     res.json({ accessToken });
  //   } else {
  //     res.status(500).json({ error: "Unable to create the session." });
  //   }
};

export default sync;
