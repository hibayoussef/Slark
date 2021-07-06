import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Box, Button, TextField } from '@material-ui/core';
import {useKanban} from "../zustand";
import {useSpaceModule} from "../../spaces/zustand";



interface KanbanCardAddProps {
  listId: string;
}

const KanbanCardAdd: FC<KanbanCardAddProps> = (props) => {
  const { listId, ...other } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };
  const  createCard  = useKanban(state => state.createCard);

  const handleAddInit = (): void => {
    setIsExpanded(true);
  };

  const handleAddCancel = (): void => {
    setIsExpanded(false);
    setName('');
  };

  const handleAddConfirm = async (): Promise<void> => {
    try {
      await createCard( name , listId);
      setIsExpanded(false);
      setName('');
      enqueueSnackbar('Card created', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  return (
    <div {...other}>
      {
        isExpanded
          ? (
            <>
              <TextField
                fullWidth
                label="Title"
                name="cardName"
                onChange={handleChange}
                value={name}
                variant="outlined"
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2
                }}
              >
                <Button
                  color="primary"
                  onClick={handleAddCancel}
                  variant="text"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleAddConfirm}
                  variant="contained"
                >
                  Add
                </Button>
              </Box>
            </>
          )
          : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Button
                color="primary"
                onClick={handleAddInit}
                variant="text"
              >
                Add Card
              </Button>
            </Box>
          )
      }
    </div>
  );
};

KanbanCardAdd.propTypes = {
  listId: PropTypes.string.isRequired
};

export default KanbanCardAdd;
