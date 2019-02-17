// https://github.com/andywer/threadpool-js/blob/master/src/genericWorker.js

const genericWorkerCode: string = `
  this.onmessage = function (event) {
    var fnData = event.data.function;
    var scripts = event.data.importScripts;
    var fn = Function.apply(null, fnData.args.concat(fnData.body));
    if (importScripts && scripts.length > 0) {
      importScripts.apply(null, scripts);
    }
    fn(event.data.parameter, function(result) {
      postMessage(result);
    });
  }
  `;

let genericWorkerDataUri: string =
  'data:text/javascript;charset=utf-8,' + encodeURI(genericWorkerCode);
let createBlobURL: string = (window as any).createBlobURL || (window as any).createObjectURL;

if (!createBlobURL) {
  const URL: any = window.URL || (window as any).webkitURL;

  if (URL) {
    createBlobURL = URL.createObjectURL;
  } else {
    throw new Error('No Blob creation implementation found.');
  }
}

if (
  typeof (window as any).BlobBuilder === 'function' &&
  typeof (window as any).createBlobURL === 'function'
) {
  const blobBuilder: any = new (window as any).BlobBuilder();
  blobBuilder.append(genericWorkerCode);
  genericWorkerDataUri = (window as any).createBlobURL(blobBuilder.getBlob());
} else if (
  typeof (window as any).Blob === 'function' &&
  typeof (window as any).createBlobURL === 'function'
) {
  const blob: Blob = new Blob([genericWorkerCode], { type: 'text/javascript' });
  genericWorkerDataUri = (window as any).createBlobURL(blob);
}

export default {
  dataUri: genericWorkerDataUri,
  genericWorkerCode: genericWorkerCode
};
