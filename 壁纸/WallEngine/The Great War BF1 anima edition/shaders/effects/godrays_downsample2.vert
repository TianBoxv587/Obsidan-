
attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec4 v_TexCoord;

uniform vec4 g_Texture0Resolution;
uniform vec4 g_Texture1Resolution;

void main() {
	gl_Position = vec4(a_Position, 1.0);
	v_TexCoord.xy = a_TexCoord;

	v_TexCoord.zw = vec2(v_TexCoord.x * g_Texture1Resolution.z / g_Texture1Resolution.x,
						v_TexCoord.y * g_Texture1Resolution.w / g_Texture1Resolution.y);

#ifdef HLSL_SM30
	vec2 offsets = 0.5 / g_Texture0Resolution.xy;
	v_TexCoord.xy += offsets;
#endif
}
