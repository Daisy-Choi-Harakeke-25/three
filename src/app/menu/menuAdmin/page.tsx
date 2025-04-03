'use client'
import UploadImage from "@/components/UploadImage"
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
const menuAdmin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadComplete = async (url: string): Promise<void> => {
    setImageUrl(url); // Store image URL
  };

  const handleAddMenuItem = async () => {
    if (!name || !description || !price || !imageUrl) {
      return alert("All fields are required!");
    }

    try {
      await addDoc(collection(db, "menuItems"), {
        name,
        description,
        price: parseFloat(price),
        url: imageUrl,
      });
      alert("Menu item added successfully!");
    } catch (error) {
      console.error("Error adding menu item", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Add New Menu Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 block w-full my-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 block w-full my-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 block w-full my-2"
      />
      
      <UploadImage onUpload={handleUploadComplete} />

      {imageUrl && <p className="text-green-600">Image uploaded successfully!</p>}

      <button onClick={handleAddMenuItem} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Add Item
      </button>
    </div>
  );
}
export default menuAdmin