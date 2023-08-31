import giveOpposite from "../giveOpposite";

const shopDialog = giveOpposite("shopDialog", "toggleDialog");

export const { toggleDialog } = shopDialog.actions;
export default shopDialog.reducer;