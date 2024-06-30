import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import WishlistItems from "../components/WishlistItems";
import Footer from "../components/Footer";
import GreenThing from "../components/GreenThing";

function Wishlist() {
  return (
    <>
      <Topofferbar />
      <Topnavbar />
      <GreenThing header={"Wishlist"} />
      <WishlistItems />
      <Footer />
    </>
  );
}

export default Wishlist;
