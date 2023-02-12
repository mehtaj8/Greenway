import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

interface Props {
  onShowSidebar: Function;
  showSidebarButton?: boolean;
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  return (
    <Flex bg="#ffffff" p={4} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Box flex="1" />
    </Flex>
  )
}

export default Header
