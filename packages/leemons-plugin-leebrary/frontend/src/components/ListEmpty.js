import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Title, ImageLoader, Paragraph, Box } from '@bubbles-ui/components';

const ListEmpty = ({ t }) => (
  <Stack alignItems="center" justifyContent="center" direction="column" spacing={5}>
    <Box style={{ maxWidth: 400, textAlign: 'center' }}>
      <Title order={3}>{t('labels.listEmpty')}</Title>
    </Box>
    <ImageLoader src="/public/leebrary/empty.png" height={200} />
    <Box style={{ maxWidth: 400 }}>
      <Paragraph align="center">{t('labels.listEmptyDescription')}</Paragraph>
    </Box>
  </Stack>
);

ListEmpty.propTypes = {
  t: PropTypes.func.isRequired,
};

export { ListEmpty };
export default ListEmpty;
