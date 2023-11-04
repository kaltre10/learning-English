import './App.css'
import {
  Box,
  Grid,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Button,
  Center,
  VStack,
  HStack,
  Heading,
  Badge,
  Card,
  Tag,
  CardFooter,
  Flex
} from "@chakra-ui/react";
import { useState } from 'react'
import { StarIcon } from "@chakra-ui/icons";
import { ChakraProvider } from '@chakra-ui/react'
import ConfettiExplosion from "react-confetti-explosion";

const words = [
  { english: "Apple", spanish: "Manzana", type: "sustantivo", synonyms: [] },
  { english: "Run", spanish: "Correr", type: "verbo regular", synonyms: ["Jog", "Trot", "Sprint", "Race", "Rush", "Haste"] },
  { english: "Big", spanish: "Grande", type: "adjetivo", synonyms: ["Large", "Huge", "Massive", "Immense", "Gigantic", "Colossal", "Vast", "Grand"] },
  { english: "House", spanish: "Casa", type: "Sustantivo", synonyms: ["Home", "Residence", "Domicile", "Homestead", "Dwelling place", "Manor"] },
  { english: "Quickly", spanish: "Rápidamente", type: "Adverbio", synonyms: ["Fast", "Swift", "Speedily", "Rapidly", "Hastily", "Fleetly"] },
  { english: "Jump", spanish: "Saltar", type: "Verbo Irregular", synonyms: ["Bound", "Bounce", "Skip", "Lunge", "Hurdle"] },
  { english: "Happy	", spanish: "Feliz", type: "Adjetivo", synonyms: ["Joyful", "Content", "Cheerful", "Merry", "Overjoyed"] },
  { english: "Dog", spanish: "Perro", type: "Verbo Regular", synonyms: ["Canine", "Pooch", "Hound", "Pup", "Canid", "Fido", "Cur", "Man's best friend"] },
  { english: "Play", spanish: "Jugar", type: "adjetivo", synonyms: ["Romp", "Gambol", "Game", "Frolic", "Amuse", "Entertain", "Engage in recreation"] },
  { english: "Beautiful", spanish: "Hermoso", type: "Adjetivo", synonyms: ["Gorgeous", "Lovely", "Stunning", "Attractive", "Splendid", "Ravishing"] }
  // Agrega más palabras aquí
];

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const currentWord = words[currentWordIndex];

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const removeAccents = (str: string) => {
    return str
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleCheckAnswer = () => {
    if(inputValue === "") return; 

    const normalizedInput = removeAccents(inputValue);
    const normalizedSpanish = removeAccents(currentWord.spanish);

    if (normalizedInput === normalizedSpanish) {
      setIsModalOpen(true);
      setInputValue("");
      setCurrentWordIndex(currentWordIndex + 1);
      if (currentWordIndex === words.length - 1) {
        setIsConfettiVisible(true);
        setIsModalOpen(false);
      }
    } else {
      setIsErrorModalOpen(true);
      setInputValue("");      
    }
  };

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    setCurrentWordIndex(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyUp = (event: any) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  return (
    <ChakraProvider>
      {isConfettiVisible && (
      <Modal isOpen={isConfettiVisible} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Has completado el nivel 🏆</ModalHeader>
          <Button onClick={() => { setIsConfettiVisible(false); setCurrentWordIndex(0); }}>
            Continuar!
          </Button>
          
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={250}
              zIndex={9999}
            />
         </div>
        </ModalContent>
      </Modal>
    )}
    
    <Grid
      h="100vh"
      templateRows="auto 1fr"
      templateColumns="1fr"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      bg="gray.700"
    >
      <Center h="100vh">
      <VStack m={2} spacing={4} alignItems="center">
        <Heading as="h1" color="teal.400" fontWeight="bold" fontSize="4xl">
          <StarIcon boxSize={8} /> Aprende Palabras en Inglés
        </Heading>
        <Text color="teal.300" fontSize="lg">
          <span role="img" aria-label="Instrucciones">📝</span> Traduce las palabras al español. ¡Diviértete aprendiendo!
        </Text>
      <Box>
      <Card p={4} bg="gray.600" marginBottom={4}>
          <Text align='center' fontSize="3xl" color="white" fontWeight="bold">
            <span style={{ marginLeft: '40px'}}>{currentWord?.english} <span style={{
                                      fontSize: "1rem",
                                      verticalAlign: "middle",
                                      display: "inline-block"
                                    }}>🔊</span>
            </span>
          </Text>

          <Flex flexDirection="column">
              <Box>
                <Tag size="md" colorScheme="teal" mb={2}>
                  {currentWord?.type} 
                </Tag>
              </Box>
              <Box>
                {currentWord?.synonyms.length > 0 && (
                  <HStack spacing={1} style={{ flexWrap: 'wrap' }}>
                    <Text color="white" fontWeight="bold">Sinónimos:</Text>
                    {currentWord.synonyms.map((synonym, index) => (
                      <Badge key={index} colorScheme="teal">
                        {synonym}
                      </Badge>
                    ))}
                  </HStack>
                )}
              </Box>
            </Flex>
          </Card>
          <Input
            placeholder="Escribe la traducción..."
            value={inputValue}
            onChange={handleInputChange}
            borderColor="teal.400"
            borderWidth="2px"
            focusBorderColor="teal.600"
            _focus={{ color: "teal.600" }}
            color="white"
            onKeyUp={handleKeyUp}
          />
        <Button colorScheme='teal' size='lg' color='gray.700' onClick={handleCheckAnswer} mt={2}>
          Comprobar
        </Button>
      </Box>
      </VStack>
      </Center>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader color="teal.600">¡Correcto!😄</ModalHeader>
          <Button onClick={() => { handleCloseModal() }}>
            ¡Siguiente palabra!
          </Button>
        </ModalContent>
      </Modal>
      <Modal isOpen={isErrorModalOpen} onClose={handleRetry} isCentered>
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader color="red.500">¡Incorrecto!😓</ModalHeader>
          La respuesta correcta es: <strong>{words[currentWordIndex]?.spanish}</strong>
          <Button onClick={handleRetry} >Intenta de nuevo</Button>
        </ModalContent>
      </Modal>
    </Grid>
    </ChakraProvider>
  )
}

export default App