import giveOpposite from "../giveOpposite";

const dialogRemove = giveOpposite("dialogRemove", "toggleDialogRemove");

export const { toggleDialogRemove } = dialogRemove.actions;
export default dialogRemove.reducer;
