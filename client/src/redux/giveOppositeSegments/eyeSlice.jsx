import giveOpposite from "../giveOpposite";

const eyeSlice = giveOpposite("eyeSlice", "toggleEye");

export const { toggleEye } = eyeSlice.actions;
export default eyeSlice.reducer;
