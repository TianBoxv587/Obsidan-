
uniform mat4 g_ModelViewProjectionMatrix;
uniform vec4 g_Texture1Resolution;

#if MASK == 1
uniform vec4 g_Texture2Resolution;
#endif

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;

void main() {
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	v_TexCoord.xy = a_TexCoord;
	
#if MASK == 1
	v_TexCoord.zw = vec2(a_TexCoord.x * g_Texture2Resolution.z / g_Texture2Resolution.x,
						a_TexCoord.y * g_Texture2Resolution.w / g_Texture2Resolution.y);
#endif
}
