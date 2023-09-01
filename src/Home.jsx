import { useMsal } from "@azure/msal-react";
import { config } from "./config";
import { BlobServiceClient } from "@azure/storage-blob";
import { InteractiveBrowserCredential } from "@azure/identity";

export const Home = () => {
  const { instance } = useMsal();

  async function login() {
    try {
      await instance.loginRedirect({
        scopes: config.scopes,
        prompt: "select_account",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadFile() {
    const accountName = "jssmalstroragerct";
    const defaultAzureCredential = new InteractiveBrowserCredential({
      clientId: import.meta.env.VITE_APP_ID,
      tenantId: import.meta.env.VITE_TENANT,
    });

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      defaultAzureCredential
    );

    // CREATE CONTAINER :

    const containerName = `newcontainer${new Date().getTime()}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId
    );

    /*

    ADD BLOB IN CONTAINER :

    const containerClient = await blobServiceClient.getContainerClient(
      "upload"
      );
    const content = "Hello world! 2";
    const blobName = "newblob2" + new Date().getTime();

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(
      content,
      content.length
    );
    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );*/
  }

  return (
    <>
      <button onClick={login}>Login</button>
      <button onClick={uploadFile}>Storage</button>
    </>
  );
};
