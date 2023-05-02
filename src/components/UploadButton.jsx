import React from 'react';
import { Button } from '@material-ui/core';
import { loadImage } from '../steganography';

export default function UploadButton() {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: 'none' }}
        id="upload-photo"
        name="upload-photo"
        type="file"
        onChange={loadImage}
      />
      <div>
        <Button style={{ margin: '1rem' }} variant="contained" component="span">
          Upload Image
        </Button>
      </div>
    </label>
  );
}

// import React, { useState } from 'react';
// import { Button, Card } from '@material-ui/core';

// export default function UploadButton() {
//   const [showOptions, setShowOptions] = useState(false);

//   function handleUpload() {
//     setShowOptions(true);
//   }

//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={handleUpload}>
//         Upload Image
//       </Button>

//       {showOptions && (
//         <Card style={{ marginTop: '1rem' }}>
//           <Button variant="contained">From My Computer</Button>
//           <Button variant="contained">From Drive</Button>
//           <Button variant="contained">From Dropbox</Button>
//           {/* Add more options as needed */}
//         </Card>
//       )}
//     </>
//   );
// }
