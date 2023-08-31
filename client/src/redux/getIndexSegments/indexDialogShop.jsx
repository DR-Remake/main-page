
import giveOpposite from "../getIndex";

const indexDialogShop = giveOpposite("indexDialogShop", "toggleDialogShop");

export const { toggleDialogShop } = indexDialogShop.actions;
export default indexDialogShop.reducer;