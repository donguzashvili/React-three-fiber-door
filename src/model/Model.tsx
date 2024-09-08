import {
  useAnimations,
  useGLTF,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const modelPath = "/anim/Test_Animation_V4.gltf";

const basePath = `/anim/`;

const textures = [
  // level 1
  {
    color: `${basePath}Door1/Door1_Color.webp`,
    normal: `${basePath}Door1/Door1_Normal.webp`,
    roughness: `${basePath}Door1/Door1_Roughness.webp`,
    emission: `${basePath}Door2/Door2_Emission.webp`,
  },
  // level 2
  {
    color: `${basePath}Door1/Door1_Color.webp`,
    normal: `${basePath}Door1/Door1_Normal.webp`,
    roughness: `${basePath}Door1/Door1_Roughness.webp`,
    emission: `${basePath}Door2/Door2_Emission.webp`,
  },
  // level 3
  {
    color: `${basePath}Door1/Door1_Color.webp`,
    normal: `${basePath}Door1/Door1_Normal.webp`,
    roughness: `${basePath}Door1/Door1_Roughness.webp`,
    emission: `${basePath}Door3/Door3_Emission.webp`,
  },
  // level 4
  {
    color: `${basePath}Door4/Door4_Color.webp`,
    normal: `${basePath}Door4/Door4_Normal.webp`,
    roughness: `${basePath}Door4/Door4_Roughness.webp`,
    emission: `${basePath}Door4/Door4_Emission.webp`,
  },
  // level 5
  {
    color: `${basePath}Door4/Door4_Color.webp`,
    normal: `${basePath}Door4/Door4_Normal.webp`,
    roughness: `${basePath}Door4/Door4_Roughness.webp`,
    emission: `${basePath}Door5/Door5_Emission.webp`,
  },
  // level 6
  {
    color: `${basePath}Door6/Door6_Color.webp`,
    normal: `${basePath}Door6/Door6_Normal.webp`,
    roughness: `${basePath}Door6/Door6_Roughness.webp`,
    emission: `${basePath}Door6/Door6_Emission.webp`,
  },
  // level 7
  {
    color: `${basePath}Door6/Door6_Color.webp`,
    normal: `${basePath}Door6/Door6_Normal.webp`,
    roughness: `${basePath}Door6/Door6_Roughness.webp`,
    emission: `${basePath}Door7/Door7_Emission.webp`,
  },
  // level 8
  {
    color: `${basePath}Door6/Door6_Color.webp`,
    normal: `${basePath}Door6/Door6_Normal.webp`,
    roughness: `${basePath}Door6/Door6_Roughness.webp`,
    emission: `${basePath}Door8/Door8_Emission.webp`,
  },
  // level 9
  {
    color: `${basePath}Door6/Door6_Color.webp`,
    normal: `${basePath}Door6/Door6_Normal.webp`,
    roughness: `${basePath}Door6/Door6_Roughness.webp`,
    emission: `${basePath}Door9/Door9_Emission.webp`,
  },
  // level 10
  {
    color: `${basePath}Door6/Door6_Color.webp`,
    normal: `${basePath}Door6/Door6_Normal.webp`,
    roughness: `${basePath}Door6/Door6_Roughness.webp`,
    emission: `${basePath}Door10/Door10_Emission.webp`,
  },
];

const level = 0;

const pinkColor = "#70355E";

const rim_pointerLight_intensivity = 0.7;
const rim_pointerLight_distance = 0.2;
const rim_pointerLight_decay = 1;
const rim_pointerLight_color = pinkColor;
const rim_pointerLight_position = new THREE.Vector3(0, 0.28, 0);
const rim_pointerLight_castShadow = true;

const top_pointerLight_intensivity = 1;
const top_pointerLight_distance = 0.13;
const top_pointerLight_decay = 1;
const top_pointerLight_color = pinkColor;
const top_pointerLight_position = new THREE.Vector3(0, 0.15, -0.0);
const top_pointerLight_castShadow = true;

const middle_pointerLight_intensivity = 0.1;
const middle_pointerLight_distance = 2;
const middle_pointerLight_decay = 1;
const middle_pointerLight_color = pinkColor;
const middle_pointerLight_position = new THREE.Vector3(0, 0, -0.0);
const middle_pointerLight_castShadow = true;

const bot_pointerLight_intensivity = 0.2;
const bot_pointerLight_distance = 0.1;
const bot_pointerLight_decay = 4;
const bot_pointerLight_color = "#70355E";
const bot_pointerLight_position = new THREE.Vector3(0, -0.15, -0.0);
const bot_pointerLight_castShadow = true;

export interface ModelRef {
  StartAnimation: () => void;
  ResetAnimation: () => void;
}

const Model = forwardRef<ModelRef>((props, ref) => {
  const { nodes, materials, animations } = useGLTF(modelPath);

  //   ** refs **
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const light2Ref = useRef<THREE.DirectionalLight>(null!);
  const pointLightRef = useRef<THREE.PointLight>(null!);
  const group = useRef(null);

  // ** Animations **
  const { actions } = useAnimations(animations, group);

  const StartAnimation = () => {
    if (!actions) return;
    const action = actions["Empty.001Action"];
    const action2 = actions["EmptyAction"];

    if (!action || !action2) return;

    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action2.setLoop(THREE.LoopOnce, 1);
    action2.clampWhenFinished = true;
    action?.play();
    action2?.play();
  };

  const ResetAnimation = () => {
    if (!actions) return;
    const action = actions["Empty.001Action"];
    const action2 = actions["EmptyAction"];

    if (!action || !action2) return;

    action.stop();
    action2.stop();
    action.reset();
    action2.reset();
  };

  useImperativeHandle(ref, () => ({
    StartAnimation,
    ResetAnimation,
  }));

  // ** Textures **
  const ColorTexture = useTexture(textures[level].color, (texture) =>
    console.log("Color texture loaded:", texture)
  );
  const EmissionTexture = useTexture(textures[level].emission, (texture) =>
    console.log("Emission texture loaded:", texture)
  );
  const NormalTexture = useTexture(textures[level].normal, (texture) =>
    console.log("Normal texture loaded:", texture)
  );
  const RoughnessTexture = useTexture(textures[level].roughness, (texture) =>
    console.log("Roughness texture loaded:", texture)
  );

  //   ** Helpers **
  useHelper(pointLightRef, THREE.PointLightHelper, 0.1);
  useHelper(lightRef, THREE.DirectionalLightHelper);
  useHelper(light2Ref, THREE.DirectionalLightHelper);
  //   new RectAreaLightHelper(rectAreaLightRef.current, 5);

  //   ** wrapping styles **
  ColorTexture.wrapS = ColorTexture.wrapT = THREE.RepeatWrapping;
  ColorTexture.repeat.set(2.5, 2.5); // Adjust the texture scaling here
  //   ColorTexture.offset.set(5, 5); // Adjust the texture position here
  //   EmissionTexture.transformUv(new THREE.Vector2(2, 2));
  // EmissionTexture.rotation = Math.PI / 2; // Optional: Rotate texture if needed

  return (
    <>
      <directionalLight
        ref={lightRef}
        color={"#8D5591"}
        intensity={0.7}
        position={[0.06, 1, -1]}
      />
      <directionalLight
        ref={light2Ref}
        color={"#8D5591"}
        intensity={0.7}
        rotation={[1, 0, 0]}
      />

      <group ref={group} dispose={null} scale={1}>
        <group name="Scene001">
          <mesh
            name="Rim"
            castShadow
            receiveShadow
            geometry={nodes.Rim.geometry}
            material={materials.Door_Rim_Floor}
            position={[0.034, 0.007, 0.001]}
            rotation={[Math.PI, 0, Math.PI / 2]}
            scale={0.883}
          >
            <meshStandardMaterial
              color={"#ffffff"} // Base color of the mesh
              emissive={"#ff0000"} // Emissive color (red in this case)
              emissiveIntensity={2} // Emissive intensity (increase/decrease as needed)
              emissiveMap={EmissionTexture} // If you want to use an emission map
              metalness={1}
              roughness={0.5}
            />
          </mesh>
          <group name="Empty" position={[0.02, -0.145, 0.113]} scale={0.181}>
            <mesh
              name="Door_metals_Left"
              castShadow
              receiveShadow
              geometry={nodes.Door_metals_Left.geometry}
              material={materials.Door_metals}
              position={[0.075, 0.837, -0.62]}
              rotation={[-Math.PI, 0, -Math.PI / 2]}
              scale={-4.885}
            />
            <mesh
              name="Main_Door_Left"
              castShadow
              receiveShadow
              geometry={nodes.Main_Door_Left.geometry}
              material={materials.Door_main_Decoration}
              position={[0.075, 0.837, -0.62]}
              rotation={[-Math.PI, 0, -Math.PI / 2]}
              scale={-4.885}
            >
              {/* <meshStandardMaterial map={EmissionTexture} emissiveMap={EmissionTexture} metalness={0.7} /> */}
              <meshStandardMaterial
                map={ColorTexture}
                normalMap={NormalTexture}
                roughnessMap={RoughnessTexture}
                emissiveMap={EmissionTexture}
                emissive={[0, 0, 0]} // Set emissive color
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>
            <group
              name="Plane002"
              position={[0.075, 0.837, -0.62]}
              rotation={[-Math.PI, 0, -Math.PI / 2]}
              scale={-4.885}
            >
              <group
                name="Empty009"
                position={[-0.008, -0.018, 0.063]}
                rotation={[Math.PI, 0, -Math.PI / 2]}
                scale={-0.081}
              >
                <mesh
                  name="Handle_Emission_Left"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Emission_Left.geometry}
                  material={materials.Door_Handle_Emission}
                  position={[0.213, 0, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                >
                  {/* <directionalLight
                    ref={lightRef}
                    color="#70355E"
                    intensity={0.5} // Adjust the intensity
                    position={[0, 0.15, 0]} // Adjust the position relative to the mesh
                    rotation={[Math.PI / 2, 0, 0]}
                    castShadow
                  /> */}
                  <pointLight
                    // ref={pointLightRef}
                    intensity={rim_pointerLight_intensivity} // Adjust the intensity
                    distance={rim_pointerLight_distance} // Adjust the distance to control the range
                    decay={rim_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={rim_pointerLight_color} // Adjust the color if needed
                    position={rim_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow={rim_pointerLight_castShadow}
                  />
                  <pointLight
                    // ref={pointLightRef}
                    intensity={top_pointerLight_intensivity} // Adjust the intensity
                    distance={top_pointerLight_distance} // Adjust the distance to control the range
                    decay={top_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={top_pointerLight_color} // Adjust the color if needed
                    position={top_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow={top_pointerLight_castShadow}
                  />
                  <pointLight
                    // ref={pointLightRef}
                    intensity={middle_pointerLight_intensivity} // Adjust the intensity
                    distance={middle_pointerLight_distance} // Adjust the distance to control the range
                    decay={middle_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={middle_pointerLight_color} // Adjust the color if needed
                    position={middle_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow={middle_pointerLight_castShadow}
                  />
                  <pointLight
                    // ref={pointLightRef}
                    intensity={bot_pointerLight_intensivity} // Adjust the intensity
                    distance={bot_pointerLight_distance} // Adjust the distance to control the range
                    decay={bot_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={bot_pointerLight_color} // Adjust the color if needed
                    position={bot_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow={bot_pointerLight_castShadow}
                  />
                </mesh>
                <mesh
                  name="Handle_Holder_Secondary_Left_Bottom"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Holder_Secondary_Left_Bottom.geometry}
                  material={nodes.Handle_Holder_Secondary_Left_Bottom.material}
                  position={[0.105, -0.525, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                />
                <mesh
                  name="Handle_Holder_Secondary_Left_Top"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Holder_Secondary_Left_Top.geometry}
                  material={nodes.Handle_Holder_Secondary_Left_Top.material}
                  position={[0.105, 0.525, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                />
                <mesh
                  name="Handle_Metal_Left"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Metal_Left.geometry}
                  material={materials.Handle_Metal}
                  position={[0.213, 0, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                />
                <mesh
                  name="Plane016"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane016.geometry}
                  material={materials.Door_metals}
                  rotation={[Math.PI, 0, Math.PI / 2]}
                  scale={10.54}
                />
              </group>
            </group>
          </group>
          <group
            name="Empty001"
            position={[0.02, -0.145, -0.112]}
            scale={0.168}
          >
            <mesh
              name="Door_metals_Right"
              castShadow
              receiveShadow
              geometry={nodes.Door_metals_Right.geometry}
              material={materials.Door_metals}
              position={[0.081, 0.903, 0.669]}
              rotation={[Math.PI, 0, Math.PI / 2]}
              scale={5.272}
            />
            <mesh
              name="Main_Door_Decoration"
              castShadow
              receiveShadow
              geometry={nodes.Main_Door_Decoration.geometry}
              material={materials.Door_main_Decoration}
              position={[0.081, 0.903, 0.669]}
              rotation={[Math.PI, 0, Math.PI / 2]}
              scale={5.272}
            >
              <meshStandardMaterial
                map={ColorTexture}
                normalMap={NormalTexture}
                roughnessMap={RoughnessTexture}
                emissiveMap={EmissionTexture}
                emissive={[0, 0, 0]} // Set emissive color
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>
            <group
              name="Plane003"
              position={[0.081, 0.903, 0.669]}
              rotation={[Math.PI, 0, Math.PI / 2]}
              scale={5.272}
            >
              <group
                name="Empty008"
                position={[-0.008, -0.018, 0.059]}
                rotation={[-Math.PI, 0, Math.PI / 2]}
                scale={0.081}
              >
                <mesh
                  name="Handle_Emission_Right"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Emission_Right.geometry}
                  material={materials.Door_Handle_Emission}
                  position={[0.213, 0, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                >
                  <pointLight
                    // ref={pointLightRef}
                    intensity={rim_pointerLight_intensivity} // Adjust the intensity
                    distance={rim_pointerLight_distance} // Adjust the distance to control the range
                    decay={rim_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={rim_pointerLight_color} // Adjust the color if needed
                    position={rim_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow={rim_pointerLight_castShadow}
                  />
                  <pointLight
                    // ref={pointLightRef}
                    intensity={top_pointerLight_intensivity} // Adjust the intensity
                    distance={top_pointerLight_distance} // Adjust the distance to control the range
                    decay={top_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={top_pointerLight_color} // Adjust the color if needed
                    position={top_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow
                  />
                  <pointLight
                    // ref={pointLightRef}
                    intensity={middle_pointerLight_intensivity} // Adjust the intensity
                    distance={middle_pointerLight_distance} // Adjust the distance to control the range
                    decay={middle_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={middle_pointerLight_color} // Adjust the color if needed
                    position={middle_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow={middle_pointerLight_castShadow}
                  />
                  <pointLight
                    // ref={pointLightRef}
                    intensity={bot_pointerLight_intensivity} // Adjust the intensity
                    distance={bot_pointerLight_distance} // Adjust the distance to control the range
                    decay={bot_pointerLight_decay} // Adjust the decay to control how light fades over distance
                    color={bot_pointerLight_color} // Adjust the color if needed
                    position={bot_pointerLight_position} // Adjust the position relative to the mesh
                    castShadow={bot_pointerLight_castShadow}
                  />
                </mesh>
                <mesh
                  name="Handle_Holder_Right"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Holder_Right.geometry}
                  material={materials.Door_metals}
                  rotation={[Math.PI, 0, Math.PI / 2]}
                  scale={10.54}
                />
                <mesh
                  name="Handle_Holder_Secondary_Right_Bottom"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Holder_Secondary_Right_Bottom.geometry}
                  material={nodes.Handle_Holder_Secondary_Right_Bottom.material}
                  position={[0.105, -0.525, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                />
                <mesh
                  name="Handle_Holder_Secondary_Right_Top"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Holder_Secondary_Right_Top.geometry}
                  material={nodes.Handle_Holder_Secondary_Right_Top.material}
                  position={[0.105, 0.525, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                />
                <mesh
                  name="Handle_Metal_Right"
                  castShadow
                  receiveShadow
                  geometry={nodes.Handle_Metal_Right.geometry}
                  material={materials.Handle_Metal}
                  position={[0.213, 0, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={10.54}
                />
              </group>
            </group>
          </group>
          <group name="Cube002" position={[0.034, 0.007, 0]} />
          <mesh
            name="Floor001"
            castShadow
            receiveShadow
            geometry={nodes.Floor001.geometry}
            material={materials.Door_Rim_Floor}
            position={[0.024, -0.153, 0.001]}
            scale={0.949}
          >
            <meshStandardMaterial
              color={pinkColor} // Base color of the mesh
              emissive={pinkColor} // Emissive color (red in this case)
              emissiveIntensity={0} // Emissive intensity (increase/decrease as needed)
              emissiveMap={EmissionTexture} // If you want to use an emission map
              metalness={1}
              roughness={0.5}
            />
          </mesh>
          <mesh
            name="Plane014"
            castShadow
            receiveShadow
            geometry={nodes.Plane014.geometry}
            material={nodes.Plane014.material}
            position={[0.051, 0.081, -0.046]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            name="Sphere003"
            castShadow
            receiveShadow
            geometry={nodes.Sphere003.geometry}
            material={materials.Door_Screws}
            position={[0.041, 0.007, 0.098]}
          />
          <mesh
            name="Sphere009"
            castShadow
            receiveShadow
            geometry={nodes.Sphere009.geometry}
            material={materials.Door_Screws}
            position={[0.041, 0.007, 0.098]}
          />
        </group>
      </group>
    </>
  );
});

export default Model;
