import { useState } from 'react';
import Folder from './Folder';
import File from './File';
import TextEditor from './TextEditor';
import NoteMaker from './NoteMaker';
import ListMaker from './ListMaker';
import ReadmePreview from './ReadmePreview';
import DndContext from './DndContext';

const IDE = () => {
  const [structure, setStructure] = useState({
    src: {
      components: {
        files: ['Header.js', 'Footer.js']
      },
      styles: {
        files: ['global.css']
      },
      files: ['index.html', 'example.ed', 'notes.note', 'list.lt', 'README.readme']
    }
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState({});

  const addFile = (path, fileName) => {
    const newStructure = { ...structure };
    const dirs = path.split('/');
    let current = newStructure;
    dirs.forEach(dir => {
      if (!current[dir]) {
        current[dir] = { files: [] };
      }
      current = current[dir];
    });
    current.files.push(fileName);
    setStructure(newStructure);
  };

  const moveFile = (fileName, destination) => {
    // Remove the file from its current location
    const newStructure = { ...structure };
    const removeFile = (current) => {
      for (const key in current) {
        if (key === 'files') {
          const index = current[key].indexOf(fileName);
          if (index > -1) {
            current[key].splice(index, 1);
            return true;
          }
        } else if (removeFile(current[key])) {
          return true;
        }
      }
      return false;
    };
    removeFile(newStructure);

    // Add the file to the new location
    const dirs = destination.split('/');
    let current = newStructure;
    dirs.forEach(dir => {
      if (!current[dir]) {
        current[dir] = { files: [] };
      }
      current = current[dir];
    });
    current.files.push(fileName);
    setStructure(newStructure);
  };

  const renderStructure = (structure, path = '') => {
    return Object.keys(structure).map(key => {
      if (key === 'files') {
        return structure[key].map(file => {
          const extension = file.split('.').pop();
          return <File key={file} name={file} extension={extension} onClick={setSelectedFile} />;
        });
      }
      return (
        <Folder key={key} name={key} onDrop={(item) => moveFile(item.name, `${path}/${key}`)}>
          {renderStructure(structure[key], `${path}/${key}`)}
        </Folder>
      );
    });
  };

  const renderFileContent = () => {
    if (!selectedFile) return <div>Select a file to view its contents</div>;

    const extension = selectedFile.split('.').pop();
    const content = fileContents[selectedFile] || '';

    switch (extension) {
      case 'ed':
        return <TextEditor content={content} setContent={text => setFileContents({ ...fileContents, [selectedFile]: text })} />;
      case 'note':
        return <NoteMaker />;
      case 'lt':
        return <ListMaker />;
      case 'readme':
        return <ReadmePreview content={content} />;
      default:
        return <div>Unsupported file type</div>;
    }
  };

  return (
    <DndContext>
      <div className="flex">
        <div className="w-1/4 p-4">
          {renderStructure(structure)}
          <button onClick={() => addFile('src/components', 'NewComponent.js')}>Add File</button>
        </div>
        <div className="w-3/4 p-4 border-l">
          {renderFileContent()}
        </div>
      </div>
    </DndContext>
  );
};

export default IDE;
