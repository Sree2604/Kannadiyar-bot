import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import WishlistItems from "../components/WishlistItems";
import Footer from "../components/Footer";
import GreenThing from "../components/GreenThing";
import Share from "../components/Share";

function Wishlist() {
  return (
    <>
      <Topofferbar />
      <Topnavbar />
      <GreenThing header={"Wishlist"} />
      <WishlistItems />
      <Footer />
      <Share/>
    </>
  );
}

export default Wishlist;
